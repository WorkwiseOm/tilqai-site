/**
 * Imperative engine for the hero "HR activities → Tilqai → business results" animation.
 *
 * Plain DOM + one <canvas> for the connecting lines, no libraries. Layout is computed
 * left-to-right and mirrored for Arabic. Below 760px wide it switches to a stacked
 * phone layout (activities on top, engine in the middle, results grid below) and
 * sets the host's height itself.
 */
import { ICONS, type HrFlowCard, type HrFlowCopy } from "./content";

export type HrFlowController = { setTurbo: (on: boolean) => void; destroy: () => void };

type Pt = { x: number; y: number };
type Curve = (t: number) => Pt;
type Source = { el: HTMLDivElement; docs: [string, number][]; anchor: Pt; cx: number };
type Card = HrFlowCard & {
  el: HTMLDivElement;
  odo: Odometer;
  value: number;
  subEl: HTMLElement;
  anchor: Pt;
  subTimer?: number;
};
type Doc = { el: HTMLDivElement; fn: Curve; t: number; dur: number; phase: "in" | "out"; label: string; out: number; card?: Card; w: number };
type Odometer = { set: (str: string, instant?: boolean) => void };

const PHONE_MAX = 640; // host width below which the stacked layout is used
const COMPACT_MAX = 900; // host width below which badges hide and labels wrap

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t: number) => 1 - Math.pow(1 - clamp(t, 0, 1), 3);
const pick = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)];
const fmt = (n: number) => Math.round(n).toLocaleString("en-US");
const zeros = (s: string) => s.replace(/\d/g, "0");
const svg = (path: string) => `<svg viewBox="0 0 24 24" aria-hidden="true">${path}</svg>`;

function odometer(el: HTMLElement): Odometer {
  let cols: (HTMLElement | null)[] = [];
  let shape = "";
  const build = (s: string) => {
    el.innerHTML = "";
    cols = [];
    for (const ch of s) {
      if (/\d/.test(ch)) {
        const d = document.createElement("span");
        d.className = "hrf-d";
        const strip = document.createElement("span");
        strip.className = "hrf-strip";
        for (let i = 0; i <= 9; i++) {
          const n = document.createElement("span");
          n.textContent = String(i);
          strip.appendChild(n);
        }
        d.appendChild(strip);
        el.appendChild(d);
        cols.push(strip);
      } else {
        el.appendChild(document.createTextNode(ch));
        cols.push(null);
      }
    }
  };
  return {
    set(str, instant) {
      const s = zeros(str);
      if (s !== shape) { shape = s; build(str); }
      [...str].forEach((ch, i) => {
        const c = cols[i];
        if (!c) return;
        if (instant) c.style.transition = "none";
        c.style.transform = `translateY(${-Number(ch)}em)`;
        if (instant) { void c.offsetHeight; c.style.transition = ""; }
      });
    },
  };
}

export function mountHrFlow(host: HTMLElement, copy: HrFlowCopy, rtl: boolean): HrFlowController {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  host.innerHTML = "";
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  host.appendChild(canvas);
  const ctx = canvas.getContext("2d")!;
  const W = () => host.clientWidth;
  const H = () => host.clientHeight;
  const fit = () => {
    const d = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W() * d;
    canvas.height = H() * d;
    ctx.setTransform(d, 0, 0, d, 0, 0);
  };

  const add = (cls: string, html: string) => {
    const el = document.createElement("div");
    el.className = "hrf-abs " + cls;
    el.innerHTML = html;
    host.appendChild(el);
    return el;
  };

  /* ── Build DOM ─────────────────────────────────────── */
  const inLabel = add("hrf-col-label hrf-reveal", copy.inLabel);
  const outLabel = add("hrf-col-label hrf-reveal",
    `<span class="hrf-live"></span>${copy.outLabel}<span class="hrf-note">· ${copy.illustrative}</span>`);
  const sources: Source[] = copy.sources.map(s => ({
    el: add("hrf-src hrf-reveal", `<span class="hrf-ic">${svg(ICONS[s.icon])}</span>${s.name}`),
    docs: s.docs, anchor: { x: 0, y: 0 }, cx: 0,
  }));
  const engine = add("hrf-engine hrf-reveal", `
    <div class="hrf-head"><span class="hrf-brand">tilq<b>ai</b></span><span class="hrf-state"><i></i><span class="hrf-st">${copy.ready}</span></span></div>
    <div class="hrf-task">${copy.waiting}</div>
    <div class="hrf-steps">${copy.steps.map(s => `<div class="hrf-step">${svg(ICONS.check)}${s}</div>`).join("")}</div>
    <div class="hrf-meter"><span>${copy.today}</span><strong class="hrf-today">0</strong></div>`);
  const E = {
    task: engine.querySelector<HTMLElement>(".hrf-task")!,
    steps: [...engine.querySelectorAll<HTMLElement>(".hrf-step")],
    st: engine.querySelector<HTMLElement>(".hrf-st")!,
    today: engine.querySelector<HTMLElement>(".hrf-today")!,
  };

  const cards: Card[] = copy.cards.map(c => {
    const el = add(`hrf-card hrf-reveal${c.featured ? " hrf-featured" : ""}${c.money ? " hrf-money" : ""}`, `
      <div class="hrf-top"><span class="hrf-lbl">${c.name}</span></div>
      <div class="hrf-kpi-row">
        <div class="hrf-kpi">${c.pre ? `<span class="hrf-pre">${c.pre}</span>` : ""}<span class="hrf-odo"></span>${c.unit ? `<span class="hrf-unit">${c.unit}</span>` : ""}</div>
        <span class="hrf-delta">${c.delta}</span>
      </div>
      ${c.goal ? '<div class="hrf-bar"><i></i></div>' : ""}
      <div class="hrf-sub"><span class="hrf-sub-text">${c.sub}</span></div>`);
    return {
      ...c, el,
      odo: odometer(el.querySelector<HTMLElement>(".hrf-odo")!),
      value: Number(c.kpi.replace(/,/g, "")),
      subEl: el.querySelector<HTMLElement>(".hrf-sub-text")!,
      anchor: { x: 0, y: 0 },
    };
  });
  const costCard = cards.find(c => c.money)!;
  const hoursCard = cards.find(c => c.featured)!;
  const setBar = (c: Card) => {
    const bar = c.el.querySelector<HTMLElement>(".hrf-bar i");
    if (bar && c.goal) bar.style.width = clamp(c.value / c.goal, 0, 1) * 100 + "%";
  };
  cards.forEach(c => c.odo.set(reduced ? c.kpi : zeros(c.kpi), true));
  if (reduced) setBar(hoursCard);

  /* ── Layout (computed LTR, mirrored for Arabic) ────── */
  let vertical = false;
  let inPort: Pt = { x: 0, y: 0 }, outPort: Pt = { x: 0, y: 0 };
  const mx = (x: number, w = 0) => (rtl ? W() - x - w : x);
  const place = (el: HTMLElement, x: number, y: number) => {
    el.style.transform = `translate(${mx(x, el.offsetWidth)}px, ${y}px)`;
  };
  const pt = (x: number, y: number): Pt => ({ x: mx(x), y });

  function layoutHorizontal(w: number) {
    host.style.height = "";
    fit();
    const h = H();
    const tight = w < 860;
    const narrowest = w < 720;
    const cardW = narrowest ? 188 : tight ? 200 : 228, engW = narrowest ? 176 : tight ? 188 : 212;
    cards.forEach(c => (c.el.style.width = cardW + "px"));
    engine.style.width = engW + "px";
    const pad = tight ? 8 : 20;
    const left = pad, right = w - cardW - pad;
    const cy = h * 0.52;
    const srcMaxW = Math.max(...sources.map(s => s.el.offsetWidth));
    const engX = lerp(left + srcMaxW, right, 0.5) - engW / 2;
    const engH = engine.offsetHeight;
    place(engine, engX, cy - engH / 2);
    const spanY = Math.min(h * 0.38, 240);
    sources.forEach((s, i) => {
      const y = cy + ((i / (sources.length - 1)) * 2 - 1) * spanY - 19;
      place(s.el, left, y);
      s.anchor = pt(left + s.el.offsetWidth, y + 19);
    });
    const gap = 10;
    const hs = cards.map(c => c.el.offsetHeight);
    const total = hs.reduce((a, b) => a + b, 0) + gap * (cards.length - 1);
    let y = cy - total / 2;
    cards.forEach((c, i) => { place(c.el, right, y); c.anchor = pt(right, y + hs[i] / 2); y += hs[i] + gap; });
    inPort = pt(engX, cy);
    outPort = pt(engX + engW, cy);
    place(inLabel, left, cy - spanY - 19 - 30);
    // Results label starts at the cards' edge, shifted inward if it is wider than the column
    place(outLabel, Math.min(right, w - pad - outLabel.offsetWidth), cy - total / 2 - 28);
  }

  function layoutVertical(w: number) {
    const pad = 4, gap = 8;
    let y = 28;
    place(inLabel, pad, 0);
    // Pack the activity chips into centred rows
    const rows: Source[][] = [[]];
    let rowW = 0;
    sources.forEach(s => {
      const sw = s.el.offsetWidth;
      if (rowW && rowW + gap + sw > w - pad * 2) { rows.push([]); rowW = 0; }
      rows[rows.length - 1].push(s);
      rowW += (rowW ? gap : 0) + sw;
    });
    rows.forEach(row => {
      const total = row.reduce((a, s) => a + s.el.offsetWidth, 0) + gap * (row.length - 1);
      let x = (w - total) / 2;
      row.forEach(s => { const sw = s.el.offsetWidth; place(s.el, x, y); s.cx = x + sw / 2; x += sw + gap; });
      y += 38 + 10;
    });
    // Documents emerge from under the whole activity block, so they never cover a chip
    const blockBottom = y - 10;
    sources.forEach(s => (s.anchor = pt(s.cx, blockBottom)));

    const engW = Math.min(280, w - pad * 2);
    engine.style.width = engW + "px";
    const engX = (w - engW) / 2, engY = y + 46, engH = engine.offsetHeight;
    place(engine, engX, engY);
    inPort = pt(engX + engW / 2, engY);
    outPort = pt(engX + engW / 2, engY + engH);

    y = engY + engH + 60;
    place(outLabel, pad, y - 26);
    const gridTop = y;
    const colW = (w - pad * 2 - 10) / 2;
    const grid = cards.filter(c => !c.featured);
    grid.forEach(c => (c.el.style.width = colW + "px"));
    for (let i = 0; i < grid.length; i += 2) {
      const pair = grid.slice(i, i + 2);
      const rowH = Math.max(...pair.map(c => c.el.offsetHeight));
      // Documents stop above their column so they never cover a number
      pair.forEach((c, j) => { const x = pad + j * (colW + 10); place(c.el, x, y); c.anchor = pt(x + colW / 2, gridTop - 6); });
      y += rowH + 10;
    }
    hoursCard.el.style.width = w - pad * 2 + "px";
    place(hoursCard.el, pad, y);
    hoursCard.anchor = pt(w / 2, gridTop - 6);
    y += hoursCard.el.offsetHeight + 8;
    host.style.height = y + "px";
    fit();
  }

  function layout() {
    const w = W();
    if (!w) return;
    vertical = w < PHONE_MAX;
    host.classList.toggle("hrf-compact", w < COMPACT_MAX);
    if (vertical) layoutVertical(w); else layoutHorizontal(w);
  }

  // Horizontal S-curves, or vertical ones on phones
  const curve = (a: Pt, b: Pt): Curve => {
    const v = vertical;
    return t => {
      const u = 1 - t;
      if (v) {
        const m = (a.y + b.y) / 2;
        return { x: u * u * u * a.x + 3 * u * u * t * a.x + 3 * u * t * t * b.x + t * t * t * b.x, y: u * u * u * a.y + 3 * u * u * t * m + 3 * u * t * t * m + t * t * t * b.y };
      }
      const m = (a.x + b.x) / 2;
      return { x: u * u * u * a.x + 3 * u * u * t * m + 3 * u * t * t * m + t * t * t * b.x, y: u * u * u * a.y + 3 * u * u * t * a.y + 3 * u * t * t * b.y + t * t * t * b.y };
    };
  };
  const stroke = (fn: Curve, upto: number, col: string, width: number) => {
    if (upto <= 0) return;
    ctx.beginPath();
    for (let i = 0; i <= 40; i++) {
      const p = fn((i / 40) * upto);
      if (i) ctx.lineTo(p.x, p.y); else ctx.moveTo(p.x, p.y);
    }
    ctx.strokeStyle = col;
    ctx.lineWidth = width;
    ctx.stroke();
  };

  /* ── Work items ─────────────────────────────────────── */
  const docs: Doc[] = [];
  const queue: Doc[] = [];
  let busy: { job: Doc; t: number } | null = null;
  let handled = 0, hoursAcc = 0;
  const timers = new Set<number>();
  const later = (fn: () => void, ms: number) => {
    const id = window.setTimeout(() => { timers.delete(id); fn(); }, ms);
    timers.add(id);
    return id;
  };

  const makeDoc = (label: string, done: boolean) => {
    const el = document.createElement("div");
    el.className = "hrf-abs hrf-doc" + (done ? " hrf-done" : "");
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = `${svg(done ? ICONS.check : ICONS.doc)}${label}`;
    host.appendChild(el);
    return el;
  };
  function send() {
    const s = pick(sources);
    const [label, out] = pick(s.docs);
    s.el.classList.add("hrf-busy");
    later(() => s.el.classList.remove("hrf-busy"), 600);
    const el = makeDoc(label, false);
    docs.push({ el, fn: curve(s.anchor, inPort), t: 0, dur: 1.6, phase: "in", label, out, w: el.offsetWidth });
  }
  function startJob(job: Doc) {
    busy = { job, t: 0 };
    engine.classList.add("hrf-working");
    E.st.textContent = copy.working;
    E.task.innerHTML = `<span>${copy.processing}</span> ${job.label}`;
    E.steps.forEach(s => (s.className = "hrf-step"));
  }
  function finishJob(job: Doc) {
    handled++;
    E.today.textContent = fmt(handled);
    const c = cards[job.out];
    const el = makeDoc(job.label, true);
    docs.push({ el, fn: curve(outPort, c.anchor), t: 0, dur: 1.2, phase: "out", label: job.label, out: job.out, card: c, w: el.offsetWidth });
    busy = null;
    if (!queue.length) {
      engine.classList.remove("hrf-working");
      E.st.textContent = copy.ready;
      E.task.textContent = copy.waiting;
    }
  }
  function plus(card: Card, txt: string) {
    const p = document.createElement("span");
    p.className = "hrf-plus";
    p.textContent = txt;
    card.el.appendChild(p);
    later(() => p.remove(), 1100);
    card.el.classList.add("hrf-hit");
    later(() => card.el.classList.remove("hrf-hit"), 700);
  }
  // The outcome card names the HR task that moved it; cost and hours grow with every task
  function land(card: Card, label: string) {
    if (card.subTimer) window.clearTimeout(card.subTimer);
    card.subEl.textContent = "✓ " + label;
    card.el.classList.add("hrf-linked");
    card.subTimer = later(() => { card.subEl.textContent = card.sub; card.el.classList.remove("hrf-linked"); }, 1800);
    plus(card, "↑");
    const omr = 9 + Math.floor(Math.random() * 16);
    costCard.value += omr;
    costCard.odo.set(fmt(costCard.value));
    plus(costCard, copy.plusMoney(omr));
    hoursAcc += 0.5;
    if (hoursAcc >= 1) {
      hoursAcc -= 1;
      hoursCard.value += 1;
      hoursCard.odo.set(String(hoursCard.value));
      plus(hoursCard, "+1");
      setBar(hoursCard);
    }
  }

  /* ── Frame loop ─────────────────────────────────────── */
  const T0 = performance.now();
  let last = T0, spawn = 0, speed = 1, turbo = false, revealed = false, counted = false, raf = 0;
  const dirSign = rtl ? -1 : 1;

  function frame(now: number) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const t = reduced ? 99 : (now - T0) / 1000;
    speed = lerp(speed, turbo ? 1.8 : 1, 1 - Math.exp(-4 * dt));

    if (!revealed && t > 0.2) {
      revealed = true;
      [inLabel, ...sources.map(s => s.el), engine, outLabel, ...cards.map(c => c.el)]
        .forEach((el, i) => later(() => el.classList.add("hrf-show"), reduced ? 0 : i * 70));
    }
    if (!counted && t > 1.2) {
      counted = true;
      cards.forEach((c, i) => later(() => { c.odo.set(c.kpi); setBar(c); }, reduced ? 0 : i * 100));
    }

    ctx.clearRect(0, 0, W(), H());
    const wire = easeOut((t - 0.6) / 1.0);
    sources.forEach(s => stroke(curve(s.anchor, inPort), wire, "rgba(255,255,255,0.12)", 1));
    cards.forEach(c => stroke(curve(outPort, c.anchor), wire, c.featured || c.money ? "rgba(0,180,216,0.18)" : "rgba(0,180,216,0.38)", 1.2));
    if (wire > 0.9) {
      [inPort, outPort].forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "#00b4d8";
        ctx.fill();
      });
    }

    if (reduced) return; // static, finished scene — no loop needed

    if (t > 2.1) {
      spawn -= dt * speed;
      if (spawn <= 0) { spawn = 1.5 + Math.random() * 0.6; send(); }
    }

    for (let i = docs.length - 1; i >= 0; i--) {
      const d = docs[i];
      d.t += (dt / d.dur) * speed;
      const k = clamp(d.t, 0, 1), e = ease(k), p = d.fn(e);
      const fade = d.phase === "in"
        ? clamp(k / 0.12, 0, 1) * clamp((1 - k) / 0.08, 0, 1)
        : clamp(k / 0.1, 0, 1) * clamp((1 - k) / 0.1, 0, 1);
      const amt = d.phase === "in" ? 1 - e : -e;
      const nx = vertical ? 0 : (d.w / 2 + 6) * amt * dirSign;
      const ny = vertical ? 19 * amt : 0;
      d.el.style.opacity = String(fade);
      d.el.style.transform = `translate(${p.x - d.w / 2 + nx}px, ${p.y - 13 + ny}px) scale(${0.92 + 0.08 * fade})`;
      if (d.t >= 1) {
        d.el.remove();
        docs.splice(i, 1);
        if (d.phase === "in") queue.push(d); else land(d.card!, d.label);
      }
    }

    if (!busy && queue.length) startJob(queue.shift()!);
    if (busy) {
      busy.t += dt * speed;
      const sd = 0.32;
      const b = busy;
      E.steps.forEach((s, i) => {
        const st = b.t - i * sd;
        s.className = "hrf-step" + (st >= sd ? " hrf-ok" : st >= 0 ? " hrf-active" : "");
      });
      if (b.t >= sd * 3 + 0.15) finishJob(b.job);
    }
    raf = requestAnimationFrame(frame);
  }

  // With reduced motion there is no loop, so redraw the static wires after any relayout
  const relayout = () => { layout(); if (reduced) frame(performance.now()); };
  relayout();
  const ro = new ResizeObserver(relayout);
  ro.observe(host);
  document.fonts?.ready.then(relayout);
  if (reduced) {
    [inLabel, ...sources.map(s => s.el), engine, outLabel, ...cards.map(c => c.el)].forEach(el => el.classList.add("hrf-show"));
    cards.forEach(c => { c.odo.set(c.kpi, true); setBar(c); });
  } else {
    raf = requestAnimationFrame(frame);
  }

  return {
    setTurbo(on) { turbo = on; },
    destroy() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      timers.forEach(id => window.clearTimeout(id));
      timers.clear();
      host.innerHTML = "";
      host.style.height = "";
      host.classList.remove("hrf-compact");
    },
  };
}
