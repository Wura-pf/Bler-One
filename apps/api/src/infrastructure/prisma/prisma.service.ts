import { PrismaClient } from "@prisma/client";
import { prisma } from "./client";

export class PrismaService {
  private readonly client: PrismaClient;

  constructor() {
    this.client = prisma;
  }

  get user() {
    return this.client.user;
  }

  get tenant() {
    return this.client.tenant;
  }

  get organization() {
    return this.client.organization;
  }

  get company() {
    return this.client.company;
  }

  get unit() {
    return this.client.unit;
  }

  get role() {
    return this.client.role;
  }

  get permission() {
    return this.client.permission;
  }

  get rolePermission() {
    return this.client.rolePermission;
  }

  $transaction<T>(
    fn: Parameters<PrismaClient["$transaction"]>[0],
    options?: Parameters<PrismaClient["$transaction"]>[1]
  ) {
    return this.client.$transaction(fn as never, options as never);
  }

  $connect() {
    return this.client.$connect();
  }

  $disconnect() {
    return this.client.$disconnect();
  }
}