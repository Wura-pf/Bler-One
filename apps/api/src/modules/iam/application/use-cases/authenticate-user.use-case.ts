import { AppError } from "../../../../shared/errors/app-error";

import {
  AuthenticateUserRequest,
  AuthenticateUserResponse,
} from "../dto/authenticate-user.dto";

import { JwtService } from "../services/jwt-service";
import { PasswordComparer } from "../services/password-comparer";

import { UserRepository } from "../../domain/repositories/user.repository";

export class AuthenticateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordComparer: PasswordComparer,
    private readonly jwtService: JwtService
  ) {}

  async execute(
    request: AuthenticateUserRequest
  ): Promise<AuthenticateUserResponse> {
    const user = await this.userRepository.findByEmail(
      request.tenantId,
      request.email
    );

    if (!user) {
      throw new AppError("E-mail ou senha inválidos.", 401);
    }

    const passwordMatches = await this.passwordComparer.compare(
      request.password,
      user.passwordHash
    );

    if (!passwordMatches) {
      throw new AppError("E-mail ou senha inválidos.", 401);
    }

    const accessToken = await this.jwtService.sign({
      sub: user.id,
      tenantId: user.tenantId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    });

    return {
      accessToken,
      user: {
        id: user.id,
        tenantId: user.tenantId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      },
    };
  }
}