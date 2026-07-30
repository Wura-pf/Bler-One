import { AppError } from "../../../../shared/errors/app-error";

import { UserRepository } from "../../domain/repositories/user.repository";

export class DeleteUserUseCase {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    await this.userRepository.delete(id);
  }
}