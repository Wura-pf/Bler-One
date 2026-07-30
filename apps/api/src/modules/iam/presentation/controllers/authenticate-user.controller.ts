import { Request, Response } from "express";

import { AuthenticateUserUseCase } from "../../application/use-cases/authenticate-user.use-case";

export class AuthenticateUserController {
  constructor(
    private readonly authenticateUserUseCase: AuthenticateUserUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const result = await this.authenticateUserUseCase.execute({
      tenantId: request.body.tenantId,
      email: request.body.email,
      password: request.body.password,
    });

    return response.status(200).json(result);
  }
}