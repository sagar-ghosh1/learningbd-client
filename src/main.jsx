import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MainLayout from "./Layout/MainLayout.jsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Router";
import AuthProvider from "./Context/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}>
        <MainLayout />
      </RouterProvider>
    </AuthProvider>
  </React.StrictMode>
);
