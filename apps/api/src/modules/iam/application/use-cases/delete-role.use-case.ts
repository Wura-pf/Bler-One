import { AppError } from "../../../../shared/errors/app-error";

import { RoleRepository } from "../../domain/repositories/role.repository";

export class DeleteRoleUseCase {
  constructor(
    private readonly roleRepository: RoleRepository
  ) {}

  async execute(id: string): Promise<void> {
    const role = await this.roleRepository.findById(id);

    if (!role) {
      throw new AppError("Cargo não encontrado.", 404);
    }

    await this.roleRepository.delete(id);
  }
}