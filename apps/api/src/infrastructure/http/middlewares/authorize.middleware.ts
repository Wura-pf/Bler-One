import { NextFunction, Request, Response } from "express";

import { makeAuthorizeUserUseCase } from "../../../modules/iam/factories/authorize-user.factory";

export function authorize(...permissions: string[]) {
  return async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    if (!request.user) {
      response.status(401).json({
        message: "Usuário não autenticado.",
      });

      return;
    }

    const authorizeUser = makeAuthorizeUserUseCase();

    for (const permission of permissions) {
      const allowed = await authorizeUser.execute({
        userId: request.user.id,
        tenantId: request.user.tenantId,
        permission,
      });

      if (allowed) {
        next();
        return;
      }
    }

    response.status(403).json({
      message: "Você não possui permissão para executar esta ação.",
    });
  };
}