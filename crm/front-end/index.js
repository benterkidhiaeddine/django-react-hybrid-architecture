import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//React app
import EmployeeList from "./Components/EmployeeList.js";
import {
  EmployeeDetail,
  loader as employeeLoader,
} from "./Components/EmployeeDetail.js";

const root = createRoot(document.getElementById("root"));

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <EmployeeList />,
    },
    {
      path: "/edit/:employeeId",
      element: <EmployeeDetail />,
      loader: employeeLoader,
    },
  ],

  //This is the employees base route
  {
    basename: "/employees",
  }
);

root.render(<RouterProvider router={router} />);
