class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greeting() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}

class BankAccount extends Person {
  constructor(name, age, accountNumber, balance) {
    super(name, age);
    this.accountNumber = accountNumber;
    this._balance = balance;
  }

  getBalance() {
    console.log(`Current balance is ₹${this._balance.toLocaleString()}`);
    return this._balance;
  }

  setBalance(amount) {
    if (amount >= 0) {
      this._balance = amount;
      console.log(`Balance updated to ₹${this._balance.toLocaleString()}`);
    } else {
      console.log("Error: Balance cannot be negative.");
    }
  }

  deposit(amount) {
    if (amount <= 0) {
      console.log("Invalid deposit amount. Please enter more than ₹0.");
    } else {
      console.log(`Depositing ₹${amount.toLocaleString()}...`);
      this._balance += amount;
      console.log(`Deposit successful. New balance is ₹${this._balance.toLocaleString()}`);
    }
  }

  withdraw(amount) {
    if (amount <= 0) {
      console.log("Invalid withdrawal amount. Please enter more than ₹0.");
    } else if (amount > this._balance) {
      console.log(`Insufficient balance! You tried to withdraw ₹${amount.toLocaleString()}, but you only have ₹${this._balance.toLocaleString()}.`);
    } else {
      console.log(`Withdrawing ₹${amount.toLocaleString()}...`);
      this._balance -= amount;
      console.log(`Withdrawal successful. Remaining balance is ₹${this._balance.toLocaleString()}`);
    }
  }

  accountDetails() {
    console.log(".............Account Details..............");
    console.log(`Account Holder : ${this.name}`);
    console.log(`Age            : ${this.age}`);
    console.log(`Account Number : ${this.accountNumber}`);
    console.log(`Balance        : ₹${this._balance.toLocaleString()}`);
    console.log(".....................................");
  }
}


const sajid = new BankAccount("Sajid Shaikh", 22, "AC9988776655", 150000);


sajid.greeting();
sajid.accountDetails();


sajid.deposit(25000);


sajid.withdraw(180000);


sajid.withdraw(50000);


sajid.getBalance();
  console.log(".....................................");