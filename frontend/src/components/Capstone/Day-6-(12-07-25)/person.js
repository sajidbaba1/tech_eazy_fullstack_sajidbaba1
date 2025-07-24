class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greeting() {
    console.log(` Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}

class Teacher extends Person {
  constructor(name, age, subject, experience) {
    super(name, age);
    this.subject = subject;
    this.experience = experience;
  }

  introduce() {
    console.log(` I am ${this.name}, I teach ${this.subject} and have ${this.experience} years of experience.`);
  }
}

const fatima = new Teacher("Fatima", 35, "Mathematics", 10);

fatima.greeting();
fatima.introduce();
