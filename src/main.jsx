// Entry point: mounts React into <div id="root"> from index.html.
// BrowserRouter enables page navigation (/, /menu) without full page reloads.
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.DEV ? '/' : '/responsive-resturant-website'}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
