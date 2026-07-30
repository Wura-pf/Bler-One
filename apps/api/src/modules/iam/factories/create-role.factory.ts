import { PrismaService } from "../../../infrastructure/prisma/prisma.service";

import { CreateRoleController } from "../presentation/controllers/role.controller";
import { CreateRoleUseCase } from "../application/use-cases/create-role.use-case";

import { PrismaRoleRepository } from "../infrastructure/repositories/prisma-role.repository";

export function makeCreateRoleController(): CreateRoleController {
  const prisma = new PrismaService();

  const repository = new PrismaRoleRepository(prisma);

  const useCase = new CreateRoleUseCase(repository);

  return new CreateRoleController(useCase);
}