import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ContextProvider } from "./context/GlobalProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
