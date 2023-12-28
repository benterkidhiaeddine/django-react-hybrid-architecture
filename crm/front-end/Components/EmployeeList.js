import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { DeleteButton, EditButton } from "./Buttons";

function EmployeeList() {
  const [employeeList, setEmployeeList] = useState([]);

  //Load the initials users from the api
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/employees")
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
                <EditButton employeeId={employee.id} />
                <DeleteButton employeeId={employee.id} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default EmployeeList;
