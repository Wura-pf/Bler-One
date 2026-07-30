import { PrismaService } from "../../../infrastructure/prisma/prisma.service";

import { DeleteUserController } from "../presentation/controllers/delete-user.controller";
import { DeleteUserUseCase } from "../application/use-cases/delete-user.use-case";

import { PrismaUserRepository } from "../infrastructure/repositories/prisma-user.repository";

export function makeDeleteUserController(): DeleteUserController {
  const prisma = new PrismaService();

  const repository = new PrismaUserRepository(prisma);

  const useCase = new DeleteUserUseCase(repository);

  return new DeleteUserController(useCase);
}