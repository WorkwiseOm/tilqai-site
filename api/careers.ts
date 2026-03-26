const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, role, link, problem, cv } = req.body ?? {};

  if (!name?.trim() || !role?.trim() || !problem?.trim()) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const attachments: { filename: string; content: string }[] = [];
  if (cv?.content && cv?.filename) {
    attachments.push({ filename: cv.filename, content: cv.content });
  }

  const linkHtml = link
    ? `<a href="${esc(link)}">${esc(link)}</a>`
    : "Not provided";

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
            <tr><td style="padding:8px 12px;font-weight:bold;vertical-align:top">What they do</td><td style="padding:8px 12px">${esc(role)}</td></tr>
            <tr><td style="padding:8px 12px;font-weight:bold;vertical-align:top">CV / LinkedIn</td><td style="padding:8px 12px">${linkHtml}</td></tr>
          </table>
          <h3>Problem they'd automate</h3>
          <p style="white-space:pre-wrap">${esc(problem)}</p>
        `,
        ...(attachments.length > 0 ? { attachments } : {}),
      }),
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    }
    const err = await response.text();
    console.error("Resend error:", err);
    return res.status(500).json({ error: "Failed to send" });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
