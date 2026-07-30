import { Router } from "express";

import { makeCreateRoleController } from "../../factories/create-role.factory";

import { authMiddleware } from "../../../../infrastructure/http/middlewares/auth.middleware";
import { authorize } from "../../../../infrastructure/http/middlewares/authorize.middleware";

const router = Router();

const createRoleController = makeCreateRoleController();

router.post(
  "/",
  authMiddleware,
  authorize("iam.role.create"),
  async (req, res, next) => {
    try {
      const response = await createRoleController.handle({
        body: req.body,
      });

      return res.status(response.status).json(response.body);
    } catch (error) {
      next(error);
    }
  }
);

export default router;