declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
    };
  }
}

export const openCalendly = () => {
  window.Calendly?.initPopupWidget({ url: 'https://calendly.com/tas770/30min' });
};
