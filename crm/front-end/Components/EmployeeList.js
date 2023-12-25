import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

import { DeleteButton, EditButton } from "./Buttons";

function EmployeeList() {
  const [employeeList, setEmployeeList] = useState([]);

  //Load the initials users from the api
  useEffect(() => {
    fetch("/api/employees")
      .then((response) => response.json())
      .then((json) => {
        setEmployeeList(json);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Department</th>
          <th>Salary</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {employeeList.map((employee) => {
          return (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>{employee.salary}$</td>
              <td>
                <EditButton />
                <DeleteButton />
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default EmployeeList;
