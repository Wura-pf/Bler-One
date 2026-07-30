import { Permission } from "../entities/permission.entity";

export interface PermissionRepository {
  findByCode(code: string): Promise<Permission | null>;

  findByCodes(codes: string[]): Promise<Permission[]>;
}