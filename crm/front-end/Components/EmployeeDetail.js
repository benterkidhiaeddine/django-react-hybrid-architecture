import React from "react";
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export async function loader({ params }) {
  const response = await fetch(
    `http://127.0.0.1:8000/api/employees/${params.employeeId}`
  );
  const employee = await response.json();
  return { employee };
}

export function EmployeeDetail() {
  const naviagate = useNavigate();

  //load the initial data for the user
  const { employee } = useLoaderData();

  const [name, setName] = useState(employee.name);
  const [department, setDepartment] = useState(employee.department);
  const [salary, setSalary] = useState(employee.salary);

  //Errors display

  const [errors, setErrors] = useState({});
  // Url where we are going to update the employee data
  const employeesURL = `http://127.0.0.1:8000/api/employees/${employee.id}/`;

  //Validation state variables
  const [validated, setValidated] = useState(true);

  //Function that handles the submit of the form
  function handleSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      return;
    }
    setValidated(true);

    const employee = { name, department, salary };
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
      .catch((err) => console.err(err));

    //redirect to the employees List
    naviagate("/");
  }

  function handleCancel() {
    naviagate("/");
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
