import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import IndexPage from "./pages/IndexPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import MyRecipesPage from "./pages/MyRecipesPage.jsx";
import InventoryOrSearchPage from "./pages/InventoryOrSearchPage.jsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/recipes",
    element: <MyRecipesPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/inventory",
    element: <InventoryOrSearchPage />,
    errorElement: <ErrorPage />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
