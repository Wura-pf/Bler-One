import { PrismaService } from "../../../../infrastructure/prisma/prisma.service";

import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";
import { UserMapper } from "../prisma/user.mapper";

export class PrismaUserRepository implements UserRepository {
  constructor(
    private readonly prisma: PrismaService = new PrismaService()
  ) {}

  async create(user: User): Promise<User> {
    const created = await this.prisma.user.create({
      data: UserMapper.toPersistence(user),
    });

    return UserMapper.toDomain(created);
  }

  async update(user: User): Promise<User> {
    const updated = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: UserMapper.toPersistence(user),
    });

    return UserMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    return user ? UserMapper.toDomain(user) : null;
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        firstName: "asc",
      },
    });

    return users.map(UserMapper.toDomain);
  }

  async findByEmail(
    tenantId: string,
    email: string
  ): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        tenantId,
        email,
        deletedAt: null,
      },
    });

    return user ? UserMapper.toDomain(user) : null;
  }

  async findByUsername(
    tenantId: string,
    username: string
  ): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        tenantId,
        username,
        deletedAt: null,
      },
    });

    return user ? UserMapper.toDomain(user) : null;
  }

  async existsByEmail(
    tenantId: string,
    email: string
  ): Promise<boolean> {
    const count = await this.prisma.user.count({
      where: {
        tenantId,
        email,
        deletedAt: null,
      },
    });

    return count > 0;
  }

  async existsByUsername(
    tenantId: string,
    username: string
  ): Promise<boolean> {
    const count = await this.prisma.user.count({
      where: {
        tenantId,
        username,
        deletedAt: null,
      },
    });

    return count > 0;
  }
}