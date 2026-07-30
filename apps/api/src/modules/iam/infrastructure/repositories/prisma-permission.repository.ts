import { PrismaClient } from "@prisma/client";

import { Permission } from "../../domain/entities/permission.entity";
import { PermissionRepository } from "../../domain/repositories/permission.repository";

export class PrismaPermissionRepository implements PermissionRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByCode(code: string): Promise<Permission | null> {
    const permission = await this.prisma.permission.findUnique({
      where: {
        code,
      },
    });

    if (!permission) {
      return null;
    }

    return new Permission(
      permission.id,
      permission.code,
      permission.name,
      permission.description,
      permission.createdAt
    );
  }

  async findByCodes(codes: string[]): Promise<Permission[]> {
    const permissions = await this.prisma.permission.findMany({
      where: {
        code: {
          in: codes,
        },
      },
    });

    return permissions.map(
      (permission) =>
        new Permission(
          permission.id,
          permission.code,
          permission.name,
          permission.description,
          permission.createdAt
        )
    );
  }
}