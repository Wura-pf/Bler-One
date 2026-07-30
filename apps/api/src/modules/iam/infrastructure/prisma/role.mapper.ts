import { Role } from "../../domain/entities/role.entity";

export class RoleMapper {
  static toDomain(data: any): Role {
    return new Role({
      id: data.id,
      tenantId: data.tenantId,
      name: data.name,
      slug: data.slug,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
      version: data.version,
    });
  }

  static toPersistence(role: Role) {
    return {
      id: role.id,
      tenantId: role.tenantId,
      name: role.name,
      slug: role.slug,
      createdAt: role.createdAt,
      updatedAt: role.updatedAt,
      deletedAt: role.deletedAt,
      version: role.version,
    };
  }
}