import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { AppContextProvider } from "./components/context/appContext.tsx";

import ProductsLayout from "./Layout/Layout.tsx";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <AppContextProvider>
          <ProductsLayout />
        </AppContextProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  console.error("Nie znaleziono elementu root!");
}
