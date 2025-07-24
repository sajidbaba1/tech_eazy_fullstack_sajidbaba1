// Base class: Employee
class Employee {
  constructor(name, id, department) {
    this.name = name;
    this.id = id;
    this.department = department;
  }

  display() {
    console.log("📄 Employee Information:");
    console.log(`Name       : ${this.name}`);
    console.log(`ID         : ${this.id}`);
    console.log(`Department : ${this.department}`);
  }
}

// Derived class: PartTimeEmployee
class PartTimeEmployee extends Employee {
  constructor(name, id, department, hoursPerWeek, contractPeriod) {
    super(name, id, department); // Inherit base properties
    this.hoursPerWeek = hoursPerWeek;
    this.contractPeriod = contractPeriod;
  }

  // Override and extend the display method
  display() {
    super.display(); // Call parent display
    console.log(`Hours/Week : ${this.hoursPerWeek}`);
    console.log(`Contract   : ${this.contractPeriod} months`);
  }

  // Part-time specific method
  calculateMonthlyHours() {
    return this.hoursPerWeek * 4;
  }
}

// Create full-time employee
const fullTimeEmp = new Employee("Alice", 101, "Development");
fullTimeEmp.display();

console.log("\n");

// Create part-time employee
const partTimeEmp = new PartTimeEmployee("John", 202, "Support", 20, 6);
partTimeEmp.display();

console.log(`🕒 Monthly Hours: ${partTimeEmp.calculateMonthlyHours()}`);
