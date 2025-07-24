const employee = {
  id: 1,
  name: "Sajid Shaikh",
  salary: 55000
};

for (let i = 0; i < 1; i++) {
  console.log("Employee Object:", employee);
  console.log("Employee ID:", employee.id);
  console.log("Employee Name:", employee.name);
  console.log("Employee Salary:", employee.salary);
}

for (let key in employee) {
  console.log(key + ":", employee[key]);
}
