import { describe, it, expect, vi, beforeEach } from "vitest";
import handler from "../../api/careers";

type Captured = { status: number; body: unknown };

let ipCounter = 0;
function call(body: unknown, opts: { origin?: string; method?: string; ip?: string } = {}) {
  const out: Captured = { status: 0, body: undefined };
  const res = {
    status(code: number) { out.status = code; return res; },
    json(b: unknown) { out.body = b; },
    setHeader() {},
  };
  const req = {
    method: opts.method ?? "POST",
    headers: {
      origin: opts.origin ?? "https://tilqai.om",
      "x-forwarded-for": opts.ip ?? `10.0.0.${++ipCounter}`,
    },
    body,
  };
  return handler(req, res).then(() => out);
}

const valid = { name: "Sara", role: "Engineer", problem: "Automated payroll", link: "https://linkedin.com/in/sara" };
const pdf = btoa("%PDF-1.4 test");

describe("careers API", () => {
  let fetchMock: ReturnType<typeof vi.fn>;
  beforeEach(() => {
    fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal("fetch", fetchMock);
  });
  const sentHtml = () => JSON.parse(fetchMock.mock.calls[0][1].body).html as string;

  it("sends a valid submission", async () => {
    const r = await call({ ...valid, cv: { filename: "cv.pdf", content: pdf } });
    expect(r.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("rejects other methods and foreign origins", async () => {
    expect((await call(valid, { method: "GET" })).status).toBe(405);
    expect((await call(valid, { origin: "https://evil.example" })).status).toBe(403);
    expect((await call(valid, { origin: "" })).status).toBe(403);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("silently drops honeypot submissions", async () => {
    const r = await call({ ...valid, website: "spam.example" });
    expect(r.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("requires name, role and description", async () => {
    expect((await call({ name: "x" })).status).toBe(400);
  });

  it("escapes HTML and drops non-http links", async () => {
    await call({ ...valid, name: '<img src=x onerror=alert(1)>', link: 'javascript:alert(1)"' });
    const html = sentHtml();
    expect(html).not.toContain("<img");
    expect(html).not.toContain("javascript:");
    expect(html).toContain("Not provided");
  });

  it("accepts only real PDFs up to 3 MB", async () => {
    expect((await call({ ...valid, cv: { filename: "cv.exe", content: pdf } })).status).toBe(400);
    expect((await call({ ...valid, cv: { filename: "cv.pdf", content: btoa("MZ not a pdf") } })).status).toBe(400);
    const big = "JVBER" + "A".repeat(4.2 * 1024 * 1024);
    expect((await call({ ...valid, cv: { filename: "cv.pdf", content: big } })).status).toBe(413);
  });

  it("rate-limits repeated submissions from one IP", async () => {
    const statuses = [];
    for (let i = 0; i < 7; i++) statuses.push((await call(valid, { ip: "203.0.113.9" })).status);
    expect(statuses.slice(0, 5).every(s => s === 200)).toBe(true);
    expect(statuses[5]).toBe(429);
  });
});
