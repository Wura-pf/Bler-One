export interface UserPermissionRepository {
  hasPermission(
    userId: string,
    tenantId: string,
    permissionCode: string
  ): Promise<boolean>;

  getPermissionCodes(
    userId: string,
    tenantId: string
  ): Promise<string[]>;
}