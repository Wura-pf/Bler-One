export interface CreateUserRequest {
  tenantId: string;

  firstName: string;
  lastName: string;

  email: string;
  username?: string | null;

  password: string;
}

export interface CreateUserResponse {
  id: string;

  firstName: string;
  lastName: string;

  email: string;
  username?: string | null;
}