export class User {

  constructor(
    private readonly id: string,
    private readonly fullName: string,
    private readonly email: string
  ) {}

  getId() {
    return this.id;
  }

  getFullName() {
    return this.fullName;
  }

  getEmail() {
    return this.email;
  }

}