import { CreateRoleRequest } from "../../application/dto/create-role.dto";

import { CreateRoleUseCase } from "../../application/use-cases/create-role.use-case";
import {
  ListRolesRequest,
  ListRolesUseCase,
} from "../../application/use-cases/list-roles.use-case";

export interface CreateRoleHttpRequest {
  body: CreateRoleRequest;
}

export interface ListRolesHttpRequest {
  query: ListRolesRequest;
}

export interface HttpResponse {
  status: number;
  body: unknown;
}

export class CreateRoleController {
  constructor(
    private readonly createRoleUseCase: CreateRoleUseCase
  ) {}

  async handle(
    request: CreateRoleHttpRequest
  ): Promise<HttpResponse> {
    const result = await this.createRoleUseCase.execute(request.body);

    return {
      status: 201,
      body: result,
    };
  }
}

export class ListRolesController {
  constructor(
    private readonly listRolesUseCase: ListRolesUseCase
  ) {}

  async handle(
    request: ListRolesHttpRequest
  ): Promise<HttpResponse> {
    const result = await this.listRolesUseCase.execute(
      request.query
    );

    return {
      status: 200,
      body: result,
    };
  }
}