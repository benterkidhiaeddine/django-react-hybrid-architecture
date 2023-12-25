import React from "react";
import EmployeeList from "./Components/EmployeeList";
import { EmployeeDetail } from "./Components/EmployeeDetail";

function App() {
  return (
    <>
      <EmployeeList />
      <EmployeeDetail employeeId={1} />
    </>
  );
}

export default App;
