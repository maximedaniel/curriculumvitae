import { StrictMode } from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { App } from "./App";
import "./styles/main.scss";

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// The build step fills the page with HTML. Dev mode starts from an empty page.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
