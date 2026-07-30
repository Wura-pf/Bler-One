import { PrismaService } from "../../../infrastructure/prisma/prisma.service";

import { GetUserByIdController } from "../presentation/controllers/get-user-by-id.controller";
import { GetUserByIdUseCase } from "../application/use-cases/get-user-by-id.use-case";

import { PrismaUserRepository } from "../infrastructure/repositories/prisma-user.repository";

export function makeGetUserByIdController(): GetUserByIdController {
  const prisma = new PrismaService();

  const repository = new PrismaUserRepository(prisma);

  const useCase = new GetUserByIdUseCase(repository);

  return new GetUserByIdController(useCase);
}