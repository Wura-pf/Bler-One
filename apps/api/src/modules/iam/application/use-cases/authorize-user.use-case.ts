import { UserPermissionRepository } from "../../domain/repositories/user-permission.repository";

export class AuthorizeUserUseCase {
  constructor(
    private readonly userPermissionRepository: UserPermissionRepository
  ) {}

  async execute(params: {
    userId: string;
    tenantId: string;
    permission: string;
  }): Promise<boolean> {
    return this.userPermissionRepository.hasPermission(
      params.userId,
      params.tenantId,
      params.permission
    );
  }
}