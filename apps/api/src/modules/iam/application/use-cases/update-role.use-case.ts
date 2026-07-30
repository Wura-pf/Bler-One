import { AppError } from "../../../../shared/errors/app-error";

import { RoleRepository } from "../../domain/repositories/role.repository";

import {
  UpdateRoleRequest,
  UpdateRoleResponse,
} from "../dto/update-role.dto";

export class UpdateRoleUseCase {
  constructor(
    private readonly roleRepository: RoleRepository
  ) {}

  async execute(
    request: UpdateRoleRequest
  ): Promise<UpdateRoleResponse> {
    const role = await this.roleRepository.findById(request.id);

    if (!role) {
      throw new AppError("Cargo não encontrado.", 404);
    }

    const duplicatedRole =
      await this.roleRepository.findBySlug(
        request.tenantId,
        request.slug
      );

    if (
      duplicatedRole &&
      duplicatedRole.id !== role.id
    ) {
      throw new AppError(
        "Já existe um cargo com este slug.",
        409
      );
    }

    role.changeName(request.name);
    role.changeSlug(request.slug);

    const updatedRole =
      await this.roleRepository.update(role);

    return {
      id: updatedRole.id,
      name: updatedRole.name,
      slug: updatedRole.slug,
    };
  }
}