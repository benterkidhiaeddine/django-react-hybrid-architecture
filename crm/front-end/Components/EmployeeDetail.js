import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import EmployeeForm from "./EmployeeForm";

export async function loader({ params }) {
  const response = await fetch(
    `http://127.0.0.1:8000/api/employees/${params.employeeId}/`
  );
  const currentEmployee = await response.json();
  return { currentEmployee };
}

export function EmployeeDetail() {
  const navigate = useNavigate();

  //load the initial data for the user
  const { currentEmployee } = useLoaderData();
  //Function that handles the submit of the form
  function handleSubmit(e, employee) {
    const employeesURL = `http://127.0.0.1:8000/api/employees/${currentEmployee.id}/`;
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      return;
    }

    fetch(employeesURL, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",

        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(employee),
    })
      .then((response) => response.json())
      .then((json) => setErrors(json))
      .catch((err) => console.error(err));

    //redirect to the employees List
    navigate("/");
  }

  return (
    <EmployeeForm
      employeeName={currentEmployee.name}
      employeeDepartment={currentEmployee.department}
      employeeSalary={currentEmployee.salary}
      handleSubmit={handleSubmit}
    />
  );
}
