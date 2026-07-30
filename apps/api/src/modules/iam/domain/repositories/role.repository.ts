import { Role } from "../entities/role.entity";

export interface RoleRepository {
  create(role: Role): Promise<Role>;

  findById(id: string): Promise<Role | null>;

  findBySlug(
    tenantId: string,
    slug: string
  ): Promise<Role | null>;

  findAll(tenantId: string): Promise<Role[]>;

  update(role: Role): Promise<Role>;

  delete(id: string): Promise<void>;
}