import { PrismaService } from "../../../infrastructure/prisma/prisma.service";

import { CreateUserController } from "../presentation/controllers/user.controller";
import { CreateUserUseCase } from "../application/use-cases/create-user.use-case";

import { PrismaUserRepository } from "../infrastructure/repositories/prisma-user.repository";
import { BcryptPasswordHasher } from "../infrastructure/crypto/bcrypt-password-hasher";

export function makeCreateUserController(): CreateUserController {
  const prisma = new PrismaService();

  const repository = new PrismaUserRepository(prisma);

  const passwordHasher = new BcryptPasswordHasher();

  const useCase = new CreateUserUseCase(
    repository,
    passwordHasher
  );

  return new CreateUserController(useCase);
}