import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// After a new deploy, a tab that loaded the old index.html will request
// JS chunks that no longer exist. Reload once to pick up the new build
// instead of leaving the visitor on a blank page.
window.addEventListener("vite:preloadError", (event) => {
  const KEY = "tilqai:chunk-reload";
  try {
    if (sessionStorage.getItem(KEY)) return;
    sessionStorage.setItem(KEY, "1");
  } catch {
    /* storage blocked: still try one reload */
  }
  event.preventDefault();
  window.location.reload();
});

createRoot(document.getElementById("root")!).render(<App />);
