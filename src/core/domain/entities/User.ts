export class User {

  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly lastName: string,
    private readonly email: string,
    private readonly password?: string
  ) {}

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getLastName() {
    return this.lastName;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }

}