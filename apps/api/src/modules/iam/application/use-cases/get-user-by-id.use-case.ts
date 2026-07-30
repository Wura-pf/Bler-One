import { AppError } from "../../../../shared/errors/app-error";

import { UserRepository } from "../../domain/repositories/user.repository";

export interface GetUserByIdResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username?: string | null;
  active: boolean;
  emailVerified: boolean;
}

export class GetUserByIdUseCase {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async execute(id: string): Promise<GetUserByIdResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      active: user.active,
      emailVerified: user.emailVerified,
    };
  }
}