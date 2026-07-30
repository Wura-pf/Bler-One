import { User as PrismaUser } from "@prisma/client";
import { User } from "../../domain/entities/user.entity";

export class UserMapper {
  static toDomain(prismaUser: PrismaUser): User {
    return new User({
      id: prismaUser.id,

      tenantId: prismaUser.tenantId,

      firstName: prismaUser.firstName,
      lastName: prismaUser.lastName,

      email: prismaUser.email,
      username: prismaUser.username,

      passwordHash: prismaUser.passwordHash,

      active: prismaUser.active,
      emailVerified: prismaUser.emailVerified,

      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
      deletedAt: prismaUser.deletedAt,
      version: prismaUser.version,
    });
  }

  static toPersistence(user: User) {
    return {
      id: user.id,

      tenantId: user.tenantId,

      firstName: user.firstName,
      lastName: user.lastName,

      email: user.email,
      username: user.username,

      passwordHash: user.passwordHash,

      active: user.active,
      emailVerified: user.emailVerified,

      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
      version: user.version,
    };
  }
}