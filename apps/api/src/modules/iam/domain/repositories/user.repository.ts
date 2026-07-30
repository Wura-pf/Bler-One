import { User } from "../entities/user.entity";

export interface UserRepository {
  create(user: User): Promise<User>;

  update(user: User): Promise<User>;

  delete(id: string): Promise<void>;

  findById(id: string): Promise<User | null>;

  findAll(): Promise<User[]>;

  findByEmail(
    tenantId: string,
    email: string
  ): Promise<User | null>;

  findByUsername(
    tenantId: string,
    username: string
  ): Promise<User | null>;

  existsByEmail(
    tenantId: string,
    email: string
  ): Promise<boolean>;

  existsByUsername(
    tenantId: string,
    username: string
  ): Promise<boolean>;
}