export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private createdAt: Date,
    private updatedAt: Date,
  ) {}

  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
