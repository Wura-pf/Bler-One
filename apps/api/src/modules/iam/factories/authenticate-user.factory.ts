import { AuthenticateUserUseCase } from "../application/use-cases/authenticate-user.use-case";

import { PrismaUserRepository } from "../infrastructure/repositories/prisma-user.repository";

import { BcryptPasswordComparer } from "../../../infrastructure/security/bcrypt-password-comparer";
import { JsonWebTokenService } from "../../../infrastructure/security/jwt.service";

import { AuthenticateUserController } from "../presentation/controllers/authenticate-user.controller";

export function makeAuthenticateUserController() {
  const repository = new PrismaUserRepository();

  const passwordComparer = new BcryptPasswordComparer();

  const jwtService = new JsonWebTokenService();

  const useCase = new AuthenticateUserUseCase(
    repository,
    passwordComparer,
    jwtService
  );

  return new AuthenticateUserController(useCase);
}