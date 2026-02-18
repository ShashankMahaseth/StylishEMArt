import { AuthRepository } from "../repositories/AuthRepository";

export class SignUpUseCase {
  constructor(private repo: AuthRepository) {}

  execute(email: string, password: string) {
    return this.repo.signup(email, password);
  }
}
