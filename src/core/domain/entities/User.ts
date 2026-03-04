export class User {

  constructor(
    public readonly id: string,
    public readonly fullName: string,
    public readonly email: string
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

  toJSON() {
    return {
      id: this.id,
      name: this.fullName,
      email: this.email,
    };
  }
}