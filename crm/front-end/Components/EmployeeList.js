import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

import { DeleteButton, EditButton } from "./Buttons";

function EmployeeList() {
  const myEmployeeList = [
    { id: 1, name: "john", department: "Human Resources", salary: 5000 },
    {
      id: 2,
      name: "conner",
      department: "Research and development",
      salary: 7000,
    },
  ];
  const [employeeList, setEmployeeList] = useState(myEmployeeList);

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
