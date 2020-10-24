export class User {
  constructor(login, name, age, email, city, password) {
    this.login = login;
    this.name - name;
    this.age = age;
    this.email = email;
    this.city = city;
    this.password = password;
  }
}

export const users = [
  new User("Artem123", "Artem", 27, "avoronov123@gmail.com", "Minsk", "123"),
  new User("Artem12", "Artem", 27, "avoronov12@gmail.com", "Minsk", "123"),
  new User("Artem1", "Artem", 27, "avoronov1@gmail.com", "Minsk", "123"),
];
