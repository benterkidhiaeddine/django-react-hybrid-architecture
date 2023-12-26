import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//React app
import App from "./App.js";
import EmployeeList from "./Components/EmployeeList.js";

const root = createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/employees",
    element: <EmployeeList />,
  },
]);

root.render(<RouterProvider router={router} />);
