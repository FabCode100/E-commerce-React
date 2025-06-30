import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { CarrinhoProvider } from "./context/CarrinhoContext"; 
import { AuthProvider } from "./context/AuthContext";
import RoutesApp from "./routes";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CarrinhoProvider>
          <RoutesApp />
        </CarrinhoProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
