import jwt from "jsonwebtoken";

import { AuthenticatedUser } from "../../modules/iam/application/services/authenticated-user";

import {
  JwtPayload,
  JwtService,
} from "../../modules/iam/application/services/jwt-service";

export class JsonWebTokenService implements JwtService {
  async sign(payload: JwtPayload): Promise<string> {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET não configurado.");
    }

    return jwt.sign(payload, secret, {
      expiresIn: "1h",
    });
  }

  async verify(token: string): Promise<AuthenticatedUser> {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET não configurado.");
    }

    const payload = jwt.verify(token, secret) as JwtPayload;

    return {
      id: payload.sub,
      tenantId: payload.tenantId,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      username: payload.username ?? null,
    };
  }
}