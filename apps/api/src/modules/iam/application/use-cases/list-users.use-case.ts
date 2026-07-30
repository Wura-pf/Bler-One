import { UserRepository } from "../../domain/repositories/user.repository";

export interface ListUsersResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username?: string | null;
  active: boolean;
}

export class ListUsersUseCase {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async execute(): Promise<ListUsersResponse[]> {
    const users = await this.userRepository.findAll();

    return users.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      active: user.active,
    }));
  }
}