import { AuthenticatedUser } from "./authenticated-user";

export interface JwtPayload {
  sub: string;

  tenantId: string;

  firstName: string;
  lastName: string;

  email: string;
  username?: string | null;
}

export interface JwtService {
  sign(payload: JwtPayload): Promise<string>;

  verify(token: string): Promise<AuthenticatedUser>;
}