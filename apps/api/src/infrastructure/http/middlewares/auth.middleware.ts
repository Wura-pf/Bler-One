import { NextFunction, Request, Response } from "express";

import { JsonWebTokenService } from "../../security/jwt.service";

export async function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authorization = request.headers.authorization;

  if (!authorization) {
    response.status(401).json({
      message: "Token não informado.",
    });

    return;
  }

  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    response.status(401).json({
      message: "Token inválido.",
    });

    return;
  }

  try {
    const jwtService = new JsonWebTokenService();

    request.user = await jwtService.verify(token);

    next();
  } catch {
    response.status(401).json({
      message: "Token inválido ou expirado.",
    });
  }
}