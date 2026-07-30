export interface UpdateRoleRequest {
  id: string;
  tenantId: string;

  name: string;
  slug: string;
}

export interface UpdateRoleResponse {
  id: string;

  name: string;
  slug: string;
}