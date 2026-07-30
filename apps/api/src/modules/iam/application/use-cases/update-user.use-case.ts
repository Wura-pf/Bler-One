import { AppError } from "../../../../shared/errors/app-error";

import {
  UserRepository,
} from "../../domain/repositories/user.repository";

export interface UpdateUserRequest {
  id: string;
  firstName: string;
  lastName: string;
  active: boolean;
}

export interface UpdateUserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username?: string | null;
  active: boolean;
  emailVerified: boolean;
}

export class UpdateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async execute(
    request: UpdateUserRequest
  ): Promise<UpdateUserResponse> {
    const user = await this.userRepository.findById(request.id);

    if (!user) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    user.changeName(request.firstName, request.lastName);

    if (request.active) {
      user.activate();
    } else {
      user.deactivate();
    }

    user.incrementVersion();

    const updatedUser = await this.userRepository.update(user);

    return {
      id: updatedUser.id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      username: updatedUser.username,
      active: updatedUser.active,
      emailVerified: updatedUser.emailVerified,
    };
  }
}