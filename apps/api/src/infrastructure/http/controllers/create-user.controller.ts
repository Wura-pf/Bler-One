import { Request, Response } from "express";

import { CreateUserUseCase } from "../../../modules/iam/application/use-cases/create-user.use-case";

export class CreateUserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const result = await this.createUserUseCase.execute({
      tenantId: request.body.tenantId,

      firstName: request.body.firstName,
      lastName: request.body.lastName,

      email: request.body.email,
      username: request.body.username,

      password: request.body.password,
    });

    return response.status(201).json(result);
  }
}