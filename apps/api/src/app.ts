import express from "express";
import cors from "cors";

import { errorHandler } from "./shared/errors/error-handler";

import userRoutes from "./modules/iam/presentation/routes/user.routes";
import { authRoutes } from "./modules/iam/presentation/routes/auth.routes";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_request, response) => {
  response.json({
    message: "Backend do Blér One está funcionando! 🚀",
  });
});

app.use("/iam/users", userRoutes);

app.use("/iam/auth", authRoutes);

app.use(errorHandler);