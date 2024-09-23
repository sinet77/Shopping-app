import Cart from "./components/Cart/Cart.tsx";
import App from "./App.tsx";
import "./index.css";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import React from "react";
import { AppContextProvider } from "./components/context/appContext.tsx";
import ProductsByCategory from "./components/ProductsByCategory/ProductsByCategory.tsx";
import Favorites from "./components/Favorites/Favorites.tsx";
import ProductsLayout from "./Layout/Layout.tsx";
import PaymentForm from "./components/PaymentForm/PaymentForm.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/products" />,
  },
  {
    path: "/products",
    element: <ProductsLayout />,
    children: [
      {
        path: "",
        element: <ProductsByCategory />,
      },
      {
        path: ":category",
        element: <ProductsByCategory />,
      },
    ],
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/favorites",
    element: <Favorites />,
  },
  {
    path: "/cart/payment",
    element: <PaymentForm />,
  },
  { path: "*", element: <>There is no such page. </> },
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
