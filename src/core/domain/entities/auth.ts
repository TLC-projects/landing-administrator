export class Auth {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly lastName: string,
    private readonly email: string,
    private readonly token: string,
  ) {}

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getLastName(): string {
    return this.lastName;
  }

  getEmail(): string {
    return this.email;
  }

  getToken(): string | undefined {
    return this.token;
  }
}
