import { randomUUID } from "node:crypto";

export class CryptoUuidGenerator implements UuidGenerator {
  generate(): string {
    return randomUUID();
  }
}