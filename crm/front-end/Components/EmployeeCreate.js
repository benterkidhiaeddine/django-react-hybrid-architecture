import React from "react";
import { ReactDOM } from "react";
import EmployeeForm from "./EmployeeForm";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function EmployeeCreate() {
  const navigate = useNavigate();
  function handleSubmit(e, employee) {
    const employeesURL = `http://127.0.0.1:8000/api/employees/`;
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      return;
    }

    fetch(employeesURL, {
      method: "POST",

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

  return <EmployeeForm handleSubmit={handleSubmit} />;
}
