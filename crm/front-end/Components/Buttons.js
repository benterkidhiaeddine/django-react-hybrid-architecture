import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export function DeleteButton({ employeeId }) {
  return <Button variant="danger">Delete</Button>;
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
