class Employee {
  // Constructor to initialize properties
  constructor(name, id, code, department) {
    this.name = name;
    this.id = id;
    this.code = code;
    this.department = department;
  }

  // Non-static method to display employee details
  display() {
    console.log("---- Employee Details ----");
    console.log("Name: " + this.name);
    console.log("ID: " + this.id);
    console.log("Code: " + this.code);
    console.log("Department: " + this.department);
    console.log("--------------------------");
  }

  // Static method to display company info
  static companyInfo() {
    console.log("🏢 Company: CodeCraft Inc.");
    console.log("🌐 Website: www.codecraft.com");
  }
}

// Example: Creating employee objects
const emp1 = new Employee("Alice", 101, "E001", "Development");
const emp2 = new Employee("Bob", 102, "E002", "Marketing");

// Call non-static methods (using object)
emp1.display();
emp2.display();

// Call static method (using class)
Employee.companyInfo();
