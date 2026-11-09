declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
    };
  }
}

const BOOKING_URL = "https://calendly.com/tas770/30min";
const SCRIPT_URL = "https://assets.calendly.com/assets/external/widget.js";
const STYLE_URL = "https://assets.calendly.com/assets/external/widget.css";

let loading: Promise<void> | null = null;

/**
 * Calendly is loaded only when a visitor asks to book, so a normal visit
 * sends nothing to Calendly and stores nothing from it in the browser.
 */
function loadCalendly(): Promise<void> {
  if (window.Calendly) return Promise.resolve();
  if (loading) return loading;
  loading = new Promise<void>((resolve, reject) => {
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = STYLE_URL;
    document.head.appendChild(style);

    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      loading = null;
      script.remove();
      reject(new Error("Calendly failed to load"));
    };
    document.head.appendChild(script);
  });
  return loading;
}

export const openCalendly = () => {
  loadCalendly()
    .then(() => window.Calendly?.initPopupWidget({ url: BOOKING_URL }))
    // If the widget can't load (blocked, offline), fall back to Calendly's own page
    .catch(() => window.open(BOOKING_URL, "_blank", "noopener"));
};
