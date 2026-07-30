import { randomUUID } from "node:crypto";

import { AppError } from "../../../../shared/errors/app-error";

import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";

import {
  CreateUserRequest,
  CreateUserResponse,
} from "../dto/create-user.dto";

import { PasswordHasher } from "../services/password-hasher";

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher
  ) {}

  async execute(
    request: CreateUserRequest
  ): Promise<CreateUserResponse> {
    const emailExists = await this.userRepository.existsByEmail(
      request.tenantId,
      request.email
    );

    if (emailExists) {
      throw new AppError("E-mail já cadastrado.", 409);
    }

    if (request.username) {
      const usernameExists =
        await this.userRepository.existsByUsername(
          request.tenantId,
          request.username
        );

      if (usernameExists) {
        throw new AppError(
          "Nome de usuário já cadastrado.",
          409
        );
      }
    }

    const passwordHash = await this.passwordHasher.hash(
      request.password
    );

    const now = new Date();

    const user = new User({
      id: randomUUID(),

      tenantId: request.tenantId,

      firstName: request.firstName,
      lastName: request.lastName,

      email: request.email,
      username: request.username ?? null,

      passwordHash,

      active: true,
      emailVerified: false,

      createdAt: now,
      updatedAt: now,
      deletedAt: null,
      version: 1,
    });

    const createdUser = await this.userRepository.create(user);

    return {
      id: createdUser.id,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      email: createdUser.email,
      username: createdUser.username,
    };
  }
}