import { ListUsersUseCase } from "../../application/use-cases/list-users.use-case";

export interface HttpRequest {}

export interface HttpResponse<T = unknown> {
  status: number;
  body: T;
}

export class ListUsersController {
  constructor(
    private readonly listUsersUseCase: ListUsersUseCase
  ) {}

  async handle(
    _request: HttpRequest
  ): Promise<HttpResponse> {
    const users = await this.listUsersUseCase.execute();

    return {
      status: 200,
      body: users,
    };
  }
}