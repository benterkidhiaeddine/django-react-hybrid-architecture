import React from "react";
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Cookies from "js-cookie";

export function EmployeeDetail({ employeeId }) {
  const [employeeDetail, setEmployeeDetail] = useState({});

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");

  const employeesURL = `api/employees/${employeeId}/`;

  useEffect(() => {
    fetch(employeesURL)
      .then((response) => response.json())
      .then((json) => {
        setEmployeeDetail(json);
        setName(json.name);
        setDepartment(json.department);
        setSalary(json.salary);
      });
  }, []);

  //Function that handles the submit of the form
  function handleSubmit(e) {
    e.preventDefault();
    const employee = { name, department, salary };
    fetch(employeesURL, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",

        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(employee),
    });
  }

  return (
    <Form>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter the name"
          value={name}
        />
        <Form.Text className="text-muted">The name of your employee</Form.Text>
      </Form.Group>

      <Form.Group>
        <Form.Label>Department</Form.Label>
        <Form.Select
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
      </Form.Group>

      <Form.Group className="mb-3" controlId="salary">
        <Form.Label>Salary</Form.Label>
        <Form.Control
          onChange={(e) => setSalary(e.target.value)}
          type="number"
          value={salary}
        />
        <Form.Text className="text-muted">
          Enter the salary of your employee
        </Form.Text>
      </Form.Group>

      <Button onClick={handleSubmit} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
