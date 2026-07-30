import { AuthenticatedUser } from "../../modules/iam/application/services/authenticated-user";

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export {};