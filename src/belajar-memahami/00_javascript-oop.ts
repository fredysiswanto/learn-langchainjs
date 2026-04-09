/*
JavaScript OOP (Object-Oriented Programming)
OOP adalah paradigma pemrograman yang berfokus pada objek dan kelas. Dalam OOP, kita dapat membuat objek yang memiliki properti (data) dan metode (fungsi) yang terkait dengan objek tersebut. OOP membantu kita untuk mengorganisir kode dengan lebih baik, meningkatkan modularitas, dan memudahkan pemeliharaan kode.
Konsep utama dalam OOP meliputi:
1. Kelas (Class): Blueprint untuk membuat objek. Kelas mendefinisikan properti dan metode yang akan dimiliki oleh objek yang dibuat dari kelas tersebut.
2. Objek (Object): Instance dari kelas. Objek memiliki nilai untuk properti yang didefinisikan dalam kelas dan dapat menggunakan metode yang didefinisikan dalam kelas.
3. Enkapsulasi (Encapsulation): Konsep menyembunyikan detail implementasi dari pengguna dan hanya menyediakan antarmuka yang diperlukan untuk berinteraksi dengan objek.
4. Pewarisan (Inheritance): Kemampuan untuk membuat kelas baru yang mewarisi properti dan metode dari kelas yang sudah ada, memungkinkan kita untuk membuat hierarki kelas dan mengurangi duplikasi kode.
5. Polimorfisme (Polymorphism): Kemampuan untuk menggunakan metode yang sama dengan cara yang berbeda pada objek yang berbeda, memungkinkan kita untuk menulis kode yang lebih fleksibel dan dapat digunakan kembali.

Dengan memahami konsep-konsep ini, kita dapat menulis kode JavaScript yang lebih terstruktur, modular, dan mudah dipelihara menggunakan pendekatan OOP.

Contoh sederhana implementasi OOP dalam JavaScript:
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
  }
}

const person1 = new Person("Alice", 30);
console.log(person1.greet()); // Output: Hello, my name is Alice and I am 30 years old.

Yang harus dihindari dalam OOP:
1. Menggunakan OOP secara berlebihan (Overengineering): Jangan membuat kelas dan objek yang terlalu kompleks atau tidak perlu, karena ini dapat membuat kode sulit dipahami dan dipelihara.
2. Tidak menggunakan enkapsulasi: Jangan membiarkan properti atau metode yang seharusnya tersembunyi dapat diakses langsung dari luar kelas, karena ini dapat menyebabkan masalah keamanan dan kesalahan dalam penggunaan objek.
3. Tidak memanfaatkan pewarisan dengan baik: Jangan membuat kelas yang terlalu spesifik atau tidak fleksibel, karena ini dapat mengurangi kemampuan untuk menggunakan kembali kode dan membuat hierarki kelas yang rumit.
4. Tidak memanfaatkan polimorfisme: Jangan menulis kode yang bergantung pada tipe objek tertentu, karena ini dapat membuat kode kurang fleksibel dan sulit untuk diperluas di masa depan.

Challenge:
1. Buatlah kelas "Car" dengan properti "make", "model", dan "year". Tambahkan metode "getCarInfo" yang mengembalikan string dengan informasi mobil tersebut.
2. Buatlah kelas "ElectricCar" yang mewarisi dari kelas "Car" dan tambahkan properti tambahan "batteryCapacity". Override metode "getCarInfo" untuk menyertakan informasi tentang kapasitas baterai.
3. Buatlah beberapa objek dari kelas "Car" dan "ElectricCar" dan panggil metode "getCarInfo" untuk melihat hasilnya.

challenge 4: Encapsulation
4. Buatlah kelas "BankAccount" dengan properti "accountNumber" dan "balance". Tambahkan metode "deposit" dan "withdraw" untuk mengelola saldo. Pastikan bahwa saldo tidak bisa menjadi negatif dengan menggunakan enkapsulasi untuk menyembunyikan properti "balance" dan hanya mengizinkan akses melalui metode yang telah ditentukan.
5. Buatlah beberapa objek dari kelas "BankAccount" dan uji metode "deposit" dan "withdraw" untuk memastikan bahwa saldo tidak bisa menjadi negatif.
6. pastikan private properti balance tidak bisa diakses langsung dari luar kelas, dan hanya bisa diakses melalui metode getBalance() yang mengembalikan nilai saldo saat ini.

challenge 5: Polymorphism
7. Buatlah kelas "Shape" dengan metode "area" yang mengembalikan 0. Kemudian, buatlah kelas "Circle" dan "Rectangle" yang mewarisi dari kelas "Shape" dan override metode "area" untuk menghitung luas sesuai dengan bentuknya.
8. Buatlah beberapa objek dari kelas "Circle" dan "Rectangle" dan panggil metode "area" untuk melihat hasilnya, pastikan bahwa metode "area" bekerja dengan benar untuk setiap jenis bentuk.

Dengan menyelesaikan tantangan-tantangan ini, Anda akan mendapatkan pemahaman yang lebih baik tentang konsep OOP dalam JavaScript dan bagaimana menerapkannya dalam kode Anda.
*/

// challenge 1
class Car {
  make: string;
  model: string;
  year: number;

  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  getCarInfo() {
    return `This car is a ${this.year} ${this.make} ${this.model}.`;
  }
}

console.log("Challenge 1:");
const car1 = new Car("Toyota", "Corolla", 2020);
console.log(car1.getCarInfo()); // Output: This car is a 2020 Toyota Corolla.

// challenge 2
class ElectricCar extends Car {
  batteryCapacity: number;

  constructor(
    make: string,
    model: string,
    year: number,
    batteryCapacity: number,
  ) {
    super(make, model, year); // memanggil constructor dari kelas induk (Car)
    this.batteryCapacity = batteryCapacity;
  }

  getCarInfo() {
    return `${super.getCarInfo()} It has a battery capacity of ${this.batteryCapacity} kWh.`; // memanggil metode getCarInfo dari kelas induk (Car) dan menambahkan informasi tentang kapasitas baterai.
  }
}

console.log("\nChallenge 2:");
const electricCar1 = new ElectricCar("Tesla", "Model S", 2021, 100);
console.log(electricCar1.getCarInfo()); // Output: This car is a 2021 Tesla Model S. It has a battery capacity of 100 kWh.

// challenge 3
console.log("\nChallenge 3:");
const car2 = new Car("Honda", "Civic", 2019);
const electricCar2 = new ElectricCar("Nissan", "Leaf", 2020, 40);

console.log(car2.getCarInfo()); // Output: This car is a 2019 Honda Civic.
console.log(electricCar2.getCarInfo()); // Output: This car is a 2020 Nissan Leaf. It has a battery capacity of 40 kWh.

// challenge 4
class BankAccount {
  private accountNumber: string;
  private balance: number;

  constructor(accountNumber: string, initialBalance: number = 0) {
    this.accountNumber = accountNumber;
    this.balance = initialBalance;
  }

  deposit(amount: number) {
    if (amount > 0) {
      this.balance += amount;
      console.log(`Deposited ${amount}. New balance is ${this.balance}.`);
    } else {
      console.log("Deposit amount must be positive.");
    }
  }

  withdraw(amount: number) {
    if (amount > 0) {
      if (this.balance - amount >= 0) {
        this.balance -= amount;
        console.log(`Withdrew ${amount}. New balance is ${this.balance}.`);
      } else {
        console.log("Insufficient funds. Withdrawal denied.");
      }
    } else {
      console.log("Withdrawal amount must be positive.");
    }
  }

  getBalance() {
    return this.balance;
  }
}

console.log("\nChallenge 4:");
const account1 = new BankAccount("123456789", 1000);
account1.deposit(500); // Output: Deposited 500. New balance is 1500.
account1.withdraw(200); // Output: Withdrew 200. New balance is 1300.
account1.withdraw(1500); // Output: Insufficient funds. Withdrawal denied.
console.log(`Current balance: ${account1.getBalance()}`); // Output: Current balance: 1300
console.log(account1.deposit(100)); // Error: Property 'balance' is private and only accessible within class 'BankAccount'.

console.log("Challenge 5:");
class Shape {
  area(): number {
    return 0;
  }
}

class Circle extends Shape {
  radius: number;

  constructor(radius: number) {
    super(); // memanggil constructor dari kelas induk (Shape), meskipun dalam kasus ini tidak ada properti yang diinisialisasi di kelas induk, kita tetap perlu memanggil super() untuk memastikan bahwa konstruktor kelas induk dijalankan.
    this.radius = radius;
  }

  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle extends Shape {
  public width: number;
  height: number; // properti height tidak memiliki modifier akses, sehingga secara default bersifat public

  constructor(width: number, height: number) {
    super(); // memanggil constructor dari kelas induk (Shape)
    this.width = width;
    this.height = height;
  }

  area(): number {
    return this.width * this.height;
  }
}

const circle1 = new Circle(5);
const rectangle1 = new Rectangle(4, 6);

console.log(`Area of Circle: ${circle1.area()}`); // Output: Area of Circle: 78.53981633974483
console.log(`Area of Rectangle: ${rectangle1.area()}`); // Output: Area of Rectangle: 24
