  export interface CreateRoleRequest {
    tenantId: string;

    name: string;
    slug: string;
  }

  export interface CreateRoleResponse {
    id: string;

    name: string;
    slug: string;
  }