import { PrismaService } from "../../../../infrastructure/prisma/prisma.service";

import { Role } from "../../domain/entities/role.entity";
import { RoleRepository } from "../../domain/repositories/role.repository";
import { RoleMapper } from "../prisma/role.mapper";

export class PrismaRoleRepository implements RoleRepository {
  constructor(
    private readonly prisma: PrismaService = new PrismaService()
  ) {}

  async create(role: Role): Promise<Role> {
    const created = await this.prisma.role.create({
      data: RoleMapper.toPersistence(role),
    });

    return RoleMapper.toDomain(created);
  }

  async update(role: Role): Promise<Role> {
    const updated = await this.prisma.role.update({
      where: {
        id: role.id,
      },
      data: RoleMapper.toPersistence(role),
    });

    return RoleMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.role.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async findById(id: string): Promise<Role | null> {
    const role = await this.prisma.role.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    return role ? RoleMapper.toDomain(role) : null;
  }

  async findBySlug(
    tenantId: string,
    slug: string
  ): Promise<Role | null> {
    const role = await this.prisma.role.findFirst({
      where: {
        tenantId,
        slug,
        deletedAt: null,
      },
    });

    return role ? RoleMapper.toDomain(role) : null;
  }

  async findAll(tenantId: string): Promise<Role[]> {
    const roles = await this.prisma.role.findMany({
      where: {
        tenantId,
        deletedAt: null,
      },
      orderBy: {
        name: "asc",
      },
    });

    return roles.map(RoleMapper.toDomain);
  }
}