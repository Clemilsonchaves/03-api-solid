export class UserAleadyExistsError extends Error {
  constructor() {
    super("User already exists with this email");
    this.name = "UserAlreadyExistsError";
  }
}