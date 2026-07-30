import {
  CreateRoleRequest,
} from "../../application/dto/create-role.dto";

import { CreateRoleUseCase } from "../../application/use-cases/create-role.use-case";

export interface HttpRequest {
  body: CreateRoleRequest;
}

export interface HttpResponse {
  status: number;
  body: unknown;
}

export class CreateRoleController {
  constructor(
    private readonly createRoleUseCase: CreateRoleUseCase
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const result = await this.createRoleUseCase.execute(request.body);

    return {
      status: 201,
      body: result,
    };
  }
}