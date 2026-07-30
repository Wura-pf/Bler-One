import { Router } from "express";

import {
  makeCreateRoleController,
  makeListRolesController,
} from "../../factories/create-role.factory";

import { authMiddleware } from "../../../../infrastructure/http/middlewares/auth.middleware";
import { authorize } from "../../../../infrastructure/http/middlewares/authorize.middleware";

const router = Router();

const createRoleController = makeCreateRoleController();
const listRolesController = makeListRolesController();

router.get(
  "/",
  authMiddleware,
  authorize("iam.role.read"),
  async (req, res, next) => {
    try {
      const response = await listRolesController.handle({
        query: {
          tenantId: String(req.user!.tenantId),
        },
      });

      return res.status(response.status).json(response.body);
    } catch (error) {
      next(error);
    }
  }
);

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