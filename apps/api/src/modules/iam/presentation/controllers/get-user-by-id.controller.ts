import { GetUserByIdUseCase } from "../../application/use-cases/get-user-by-id.use-case";

export interface HttpRequest {
  params: {
    id: string;
  };
}

export interface HttpResponse<T = unknown> {
  status: number;
  body: T;
}

export class GetUserByIdController {
  constructor(
    private readonly getUserByIdUseCase: GetUserByIdUseCase
  ) {}

  async handle(
    request: HttpRequest
  ): Promise<HttpResponse> {
    const user = await this.getUserByIdUseCase.execute(
      request.params.id
    );

    return {
      status: 200,
      body: user,
    };
  }
}