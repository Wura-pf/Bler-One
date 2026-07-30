import { Router } from "express";

import {
  makeCreateRoleController,
  makeDeleteRoleController,
  makeListRolesController,
  makeUpdateRoleController,
} from "../../factories/create-role.factory";

import { authMiddleware } from "../../../../infrastructure/http/middlewares/auth.middleware";
import { authorize } from "../../../../infrastructure/http/middlewares/authorize.middleware";

const router = Router();

const createRoleController = makeCreateRoleController();
const listRolesController = makeListRolesController();
const updateRoleController = makeUpdateRoleController();
const deleteRoleController = makeDeleteRoleController();

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

router.put(
  "/:id",
  authMiddleware,
  authorize("iam.role.update"),
  async (req, res, next) => {
    try {
      const response = await updateRoleController.handle({
        params: {
          id: String(req.params.id),
        },
        body: {
          tenantId: String(req.user!.tenantId),
          name: String(req.body.name),
          slug: String(req.body.slug),
        },
      });

      return res.status(response.status).json(response.body);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  authMiddleware,
  authorize("iam.role.delete"),
  async (req, res, next) => {
    try {
      const response = await deleteRoleController.handle({
        params: {
          id: String(req.params.id),
        },
      });

      return res.status(response.status).send();
    } catch (error) {
      next(error);
    }
  }
);

export default router;