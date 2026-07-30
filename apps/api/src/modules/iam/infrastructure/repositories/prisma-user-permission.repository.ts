import { PrismaService } from "../../../../infrastructure/prisma/prisma.service";

import { UserPermissionRepository } from "../../domain/repositories/user-permission.repository";

export class PrismaUserPermissionRepository
  implements UserPermissionRepository
{
  constructor(
    private readonly prisma: PrismaService = new PrismaService()
  ) {}

  async hasPermission(
    userId: string,
    tenantId: string,
    permissionCode: string
  ): Promise<boolean> {
    const rolePermission = await this.prisma.rolePermission.findFirst({
      where: {
        permission: {
          code: permissionCode,
        },
        role: {
          users: {
            some: {
              id: userId,
              tenantId,
              deletedAt: null,
            },
          },
        },
      },
    });

    return rolePermission !== null;
  }

  async getPermissionCodes(
    userId: string,
    tenantId: string
  ): Promise<string[]> {
    const rolePermissions = await this.prisma.rolePermission.findMany({
      where: {
        role: {
          users: {
            some: {
              id: userId,
              tenantId,
              deletedAt: null,
            },
          },
        },
      },
      include: {
        permission: true,
      },
    });

    return rolePermissions.map(
      (rolePermission) => rolePermission.permission.code
    );
  }
}