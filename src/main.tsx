import React from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./i18n";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Root element not found");
ReactDOM.createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>
);