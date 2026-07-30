import { AuthorizeUserUseCase } from "../application/use-cases/authorize-user.use-case";

import { PrismaUserPermissionRepository } from "../infrastructure/repositories/prisma-user-permission.repository";

export function makeAuthorizeUserUseCase() {
  const repository = new PrismaUserPermissionRepository();

  return new AuthorizeUserUseCase(repository);
}