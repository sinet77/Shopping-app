import Cart from "./components/Cart/Cart.tsx";
import App from "./App.tsx";
import "./index.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import { AppContextProvider } from "./components/context/appContext.tsx";

const router = createBrowserRouter([
  {
    path: "/products",
    element: <App />,
  },
  {
    path: "/products/:category",
    element: <App />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  { path: "*", element: <>Nie ma takiej strony. </> },
]);

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AppContextProvider>
        <RouterProvider router={router} />
      </AppContextProvider>
    </React.StrictMode>
  );
} else {
  console.error("Nie znaleziono elementu root!");
}
