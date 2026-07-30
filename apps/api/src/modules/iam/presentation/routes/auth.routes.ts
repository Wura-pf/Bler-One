import { Router } from "express";

import { makeAuthenticateUserController } from "../../factories/authenticate-user.factory";
import { authMiddleware } from "../../../../infrastructure/http/middlewares/auth.middleware";
import { authorize } from "../../../../infrastructure/http/middlewares/authorize.middleware";

const authRoutes = Router();

const authenticateUserController = makeAuthenticateUserController();

authRoutes.post("/login", (request, response) =>
  authenticateUserController.handle(request, response)
);

authRoutes.get("/me", authMiddleware, (request, response) => {
  response.json(request.user);
});

authRoutes.get(
  "/permissions-test",
  authMiddleware,
  authorize("iam.user.read"),
  (request, response) => {
    response.json({
      success: true,
      message: "Permissão concedida.",
      user: request.user,
    });
  }
);

export { authRoutes };