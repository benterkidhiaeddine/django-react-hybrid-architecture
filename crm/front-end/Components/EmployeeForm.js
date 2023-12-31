import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
export default function EmployeeForm() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");

  //Validation state variables
  const [validated, setValidated] = useState(true);

  const employeesURL = `http://127.0.0.1:8000/api/employees/`;

  //const navigation

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      return;
    }
    setValidated(true);

    const employee = { name, department, salary };
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

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          required
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter the name"
          value={name}
        />
        <Form.Text className="text-muted">The name of your employee</Form.Text>
        <Form.Control.Feedback type="invalid">
          Pleas input a name
        </Form.Control.Feedback>
        <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>Department</Form.Label>
        <Form.Select
          required
          onChange={(e) => setDepartment(e.target.value)}
          aria-label="Default select example"
          value={department}
        >
          <option defaultValue={true} value="" disabled>
            --Select a department from the dropdown--
          </option>
          {DEPARTMENT_CHOICES.map((department) => {
            return (
              <option key={department?.id} value={department?.id}>
                {department?.name}
              </option>
            );
          })}
        </Form.Select>
        <Form.Text className="text-muted">
          The department that your employee is part of
        </Form.Text>

        <Form.Control.Feedback type="invalid">
          Pleas select a department
        </Form.Control.Feedback>
        <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="salary">
        <Form.Label>Salary</Form.Label>
        <Form.Control
          required
          onChange={(e) => setSalary(e.target.value)}
          type="number"
          value={salary}
        />
        <Form.Text className="text-muted">
          Enter the salary of your employee
        </Form.Text>
        <Form.Control.Feedback type="invalid">
          Pleas enter a valid salary
        </Form.Control.Feedback>
        <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Button onClick={() => handleCancel()} variant="secondary">
        Cancel
      </Button>
    </Form>
  );
}
