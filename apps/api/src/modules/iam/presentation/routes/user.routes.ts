import { Router } from "express";

import { makeCreateUserController } from "../../factories/create-user.factory";
import { makeListUsersController } from "../../factories/list-users.factory";
import { makeGetUserByIdController } from "../../factories/get-user-by-id.factory";
import { makeUpdateUserController } from "../../factories/update-user.factory";
import { makeDeleteUserController } from "../../factories/delete-user.factory";

import { authMiddleware } from "../../../../infrastructure/http/middlewares/auth.middleware";
import { authorize } from "../../../../infrastructure/http/middlewares/authorize.middleware";

const router = Router();

const createUserController = makeCreateUserController();
const listUsersController = makeListUsersController();
const getUserByIdController = makeGetUserByIdController();
const updateUserController = makeUpdateUserController();
const deleteUserController = makeDeleteUserController();

router.get(
  "/",
  authMiddleware,
  authorize("iam.user.read"),
  async (req, res, next) => {
    try {
      const response = await listUsersController.handle({});

      return res.status(response.status).json(response.body);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  authMiddleware,
  authorize("iam.user.read"),
  async (req, res, next) => {
    try {
      const response = await getUserByIdController.handle({
        params: {
          id: String(req.params.id),
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
  authorize("iam.user.create"),
  async (req, res, next) => {
    try {
      const response = await createUserController.handle({
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
  authorize("iam.user.update"),
  async (req, res, next) => {
    try {
      const response = await updateUserController.handle({
        params: {
          id: String(req.params.id),
        },
        body: req.body,
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
  authorize("iam.user.delete"),
  async (req, res, next) => {
    try {
      const response = await deleteUserController.handle({
        params: {
          id: String(req.params.id),
        },
      });

      if (response.status === 204) {
        return res.status(204).send();
      }

      return res.status(response.status).json(response.body);
    } catch (error) {
      next(error);
    }
  }
);

export default router;