import { PrismaService } from "../../../infrastructure/prisma/prisma.service";

import { UpdateUserController } from "../presentation/controllers/update-user.controller";
import { UpdateUserUseCase } from "../application/use-cases/update-user.use-case";

import { PrismaUserRepository } from "../infrastructure/repositories/prisma-user.repository";

export function makeUpdateUserController(): UpdateUserController {
  const prisma = new PrismaService();

  const repository = new PrismaUserRepository(prisma);

  const useCase = new UpdateUserUseCase(repository);

  return new UpdateUserController(useCase);
}