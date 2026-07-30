import {
  CreateUserRequest,
  CreateUserResponse,
} from "../../application/dto/create-user.dto";

import { CreateUserUseCase } from "../../application/use-cases/create-user.use-case";

export interface HttpRequest {
  body: CreateUserRequest;
}

export interface HttpResponse<T = unknown> {
  status: number;
  body: T;
}

export class CreateUserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase
  ) {}

  async handle(
    request: HttpRequest
  ): Promise<HttpResponse<CreateUserResponse>> {
    const result = await this.createUserUseCase.execute(
      request.body
    );

    return {
      status: 201,
      body: result,
    };
  }
}