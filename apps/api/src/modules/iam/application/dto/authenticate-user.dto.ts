export interface AuthenticateUserRequest {
  tenantId: string;
  email: string;
  password: string;
}

export interface AuthenticateUserResponse {
  accessToken: string;

  user: {
    id: string;
    tenantId: string;

    firstName: string;
    lastName: string;

    email: string;
    username?: string | null;
  };
}