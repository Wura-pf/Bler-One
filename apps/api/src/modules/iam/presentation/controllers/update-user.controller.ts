import {
  UpdateUserRequest,
  UpdateUserResponse,
} from "../../application/use-cases/update-user.use-case";

import { UpdateUserUseCase } from "../../application/use-cases/update-user.use-case";

export interface HttpRequest {
  params: {
    id: string;
  };
  body: Omit<UpdateUserRequest, "id">;
}

export interface HttpResponse<T = unknown> {
  status: number;
  body: T;
}

export class UpdateUserController {
  constructor(
    private readonly updateUserUseCase: UpdateUserUseCase
  ) {}

  async handle(
    request: HttpRequest
  ): Promise<HttpResponse<UpdateUserResponse>> {
    const result = await this.updateUserUseCase.execute({
      id: request.params.id,
      ...request.body,
    });

    return {
      status: 200,
      body: result,
    };
  }
}