import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import { Link, BrowserRouter } from "react-router-dom";

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App></App>
  </BrowserRouter>
);
