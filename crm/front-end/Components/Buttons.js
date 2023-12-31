import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export function DeleteButton({ employeeId }) {
  function handleClick() {
    fetch(`http://127.0.0.1:8000/api/employees/${employeeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",

        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    });
    window.location.href = "/employees";
  }
  return (
    <Button onClick={handleClick} variant="danger">
      Delete
    </Button>
  );
}

export function EditButton({ employeeId }) {
  const navigate = useNavigate();

  function navigateEdit(employeeId) {
    navigate(`/edit/${employeeId}`);
  }

  return (
    <Button onClick={() => navigateEdit(employeeId)} variant="info">
      Edit
    </Button>
  );
}

export function CreateButton() {
  const navigate = useNavigate();
  function navigateCreate() {
    navigate(`/createEmployee`);
  }
  return <Button onClick={() => navigateCreate()}>New Employee</Button>;
}
