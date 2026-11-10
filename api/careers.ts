/**
 * Join Us form → email to hello@tilqai.om via Resend.
 *
 * Hardened against abuse: same-site origin check, honeypot field, per-IP rate
 * limit, field length limits, http(s)-only links, PDF-only CVs up to 3 MB, and
 * full HTML escaping of everything placed in the email.
 */

type Req = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
};
type Res = {
  status: (code: number) => Res;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

const MAX = { name: 100, role: 120, link: 300, problem: 3000, filename: 120 };
const MAX_CV_BYTES = 3 * 1024 * 1024;
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 5 };

const ALLOWED_ORIGIN = /^https:\/\/((www\.)?tilqai\.om|[a-z0-9-]+\.vercel\.app)$|^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

// Best-effort limiter: resets when the serverless instance is recycled.
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(t => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT.max;
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

function safeUrl(v: string): string {
  if (!v) return "";
  try {
    const u = new URL(v);
    return u.protocol === "https:" || u.protocol === "http:" ? u.toString() : "";
  } catch {
    return "";
  }
}

function header(req: Req, name: string): string {
  const v = req.headers[name];
  return (Array.isArray(v) ? v[0] : v) ?? "";
}

export default async function handler(req: Req, res: Res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const origin = header(req, "origin");
  if (!ALLOWED_ORIGIN.test(origin)) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const ip = header(req, "x-forwarded-for").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return res.status(429).json({ error: "Too many requests" });
  }

  const body = (req.body ?? {}) as Record<string, unknown>;

  // Honeypot: real visitors never see or fill this field
  if (str(body.website, 200)) {
    return res.status(200).json({ success: true });
  }

  const name = str(body.name, MAX.name).replace(/[\r\n]+/g, " ");
  const role = str(body.role, MAX.role);
  const problem = str(body.problem, MAX.problem);
  const link = safeUrl(str(body.link, MAX.link));

  if (!name || !role || !problem) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const attachments: { filename: string; content: string }[] = [];
  const cv = body.cv as { filename?: unknown; content?: unknown } | undefined;
  if (cv && (cv.filename || cv.content)) {
    const filename = str(cv.filename, MAX.filename).replace(/[^\w.\- ]+/g, "_");
    const content = typeof cv.content === "string" ? cv.content : "";
    const bytes = Math.floor((content.length * 3) / 4);
    const isPdf = /\.pdf$/i.test(filename) && content.startsWith("JVBER"); // base64 of "%PDF"
    if (!isPdf || !/^[A-Za-z0-9+/=]+$/.test(content)) {
      return res.status(400).json({ error: "CV must be a PDF file" });
    }
    if (bytes > MAX_CV_BYTES) {
      return res.status(413).json({ error: "CV is larger than 3 MB" });
    }
    attachments.push({ filename, content });
  }

  const linkHtml = link ? `<a href="${esc(link)}">${esc(link)}</a>` : "Not provided";

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Tilqai Careers <hello@tilqai.om>",
        to: "hello@tilqai.om",
        subject: `Career Interest — ${name}`,
        html: `
          <h2>New Career Interest</h2>
          <table style="border-collapse:collapse;width:100%;max-width:500px">
            <tr><td style="padding:8px 12px;font-weight:bold;vertical-align:top">Name</td><td style="padding:8px 12px">${esc(name)}</td></tr>
            <tr><td style="padding:8px 12px;font-weight:bold;vertical-align:top">Role / Specialisation</td><td style="padding:8px 12px">${esc(role)}</td></tr>
            <tr><td style="padding:8px 12px;font-weight:bold;vertical-align:top">LinkedIn</td><td style="padding:8px 12px">${linkHtml}</td></tr>
          </table>
          <h3>What they've built or improved</h3>
          <p style="white-space:pre-wrap">${esc(problem)}</p>
        `,
        ...(attachments.length > 0 ? { attachments } : {}),
      }),
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    }
    console.error("Resend error:", response.status);
    return res.status(502).json({ error: "Failed to send" });
  } catch (err) {
    console.error("Server error:", err instanceof Error ? err.message : "unknown");
    return res.status(500).json({ error: "Server error" });
  }
}
