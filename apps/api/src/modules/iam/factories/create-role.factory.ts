import { PrismaService } from "../../../infrastructure/prisma/prisma.service";

import {
  CreateRoleController,
  ListRolesController,
} from "../presentation/controllers/role.controller";

import { CreateRoleUseCase } from "../application/use-cases/create-role.use-case";
import { ListRolesUseCase } from "../application/use-cases/list-roles.use-case";

import { PrismaRoleRepository } from "../infrastructure/repositories/prisma-role.repository";

export function makeCreateRoleController(): CreateRoleController {
  const prisma = new PrismaService();

  const repository = new PrismaRoleRepository(prisma);

  const useCase = new CreateRoleUseCase(repository);

  return new CreateRoleController(useCase);
}

export function makeListRolesController(): ListRolesController {
  const prisma = new PrismaService();

  const repository = new PrismaRoleRepository(prisma);

  const useCase = new ListRolesUseCase(repository);

  return new ListRolesController(useCase);
}