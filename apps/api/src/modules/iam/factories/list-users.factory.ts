import { PrismaService } from "../../../infrastructure/prisma/prisma.service";

import { ListUsersController } from "../presentation/controllers/list-users.controller";
import { ListUsersUseCase } from "../application/use-cases/list-users.use-case";

import { PrismaUserRepository } from "../infrastructure/repositories/prisma-user.repository";

export function makeListUsersController(): ListUsersController {
  const prisma = new PrismaService();

  const repository = new PrismaUserRepository(prisma);

  const useCase = new ListUsersUseCase(repository);

  return new ListUsersController(useCase);
}