import { randomUUID } from "node:crypto";

import { AppError } from "../../../../shared/errors/app-error";

import { Role } from "../../domain/entities/role.entity";
import { RoleRepository } from "../../domain/repositories/role.repository";

import {
  CreateRoleRequest,
  CreateRoleResponse,
} from "../dto/create-role.dto";

export class CreateRoleUseCase {
  constructor(
    private readonly roleRepository: RoleRepository
  ) {}

  async execute(
    request: CreateRoleRequest
  ): Promise<CreateRoleResponse> {
    const roleExists =
      await this.roleRepository.findBySlug(
        request.tenantId,
        request.slug
      );

    if (roleExists) {
      throw new AppError(
        "Já existe um cargo com este slug.",
        409
      );
    }

    const now = new Date();

    const role = new Role({
      id: randomUUID(),

      tenantId: request.tenantId,

      name: request.name,
      slug: request.slug,

      active: true,

      createdAt: now,
      updatedAt: now,
      deletedAt: null,

      version: 1,
    });

    const createdRole =
      await this.roleRepository.create(role);

    return {
      id: createdRole.id,
      name: createdRole.name,
      slug: createdRole.slug,
    };
  }
}