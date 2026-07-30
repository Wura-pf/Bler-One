import { RoleRepository } from "../../domain/repositories/role.repository";

export interface ListRolesRequest {
  tenantId: string;
}

export interface ListRolesResponse {
  id: string;
  name: string;
  slug: string;
}

export class ListRolesUseCase {
  constructor(
    private readonly roleRepository: RoleRepository
  ) {}

  async execute(
    request: ListRolesRequest
  ): Promise<ListRolesResponse[]> {
    const roles = await this.roleRepository.findAll(
      request.tenantId
    );

    return roles.map((role) => ({
      id: role.id,
      name: role.name,
      slug: role.slug,
    }));
  }
}