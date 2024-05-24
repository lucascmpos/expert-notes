import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./app";
import { Toaster } from "sonner";
import { Footer } from "./components/footer.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <Footer />
    <Toaster />
  </React.StrictMode>
);
