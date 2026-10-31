import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

if (typeof window !== "undefined") {
  window.MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || "";
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
