import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App/App";
import "./index.css";
const container = document.getElementById("root");
const root = createRoot(container as Element);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
