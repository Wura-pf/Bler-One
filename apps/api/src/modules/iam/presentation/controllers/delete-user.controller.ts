import { DeleteUserUseCase } from "../../application/use-cases/delete-user.use-case";

export interface HttpRequest {
  params: {
    id: string;
  };
}

export interface HttpResponse<T = unknown> {
  status: number;
  body: T;
}

export class DeleteUserController {
  constructor(
    private readonly deleteUserUseCase: DeleteUserUseCase
  ) {}

  async handle(
    request: HttpRequest
  ): Promise<HttpResponse> {
    await this.deleteUserUseCase.execute(
      request.params.id
    );

    return {
      status: 204,
      body: null,
    };
  }
}