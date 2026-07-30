export interface AuthenticatedUser {
  id: string;
  tenantId: string;

  firstName: string;
  lastName: string;

  email: string;
  username?: string | null;
}