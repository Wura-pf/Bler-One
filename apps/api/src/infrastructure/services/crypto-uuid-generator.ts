import { randomUUID } from "node:crypto";

export class CryptoUuidGenerator {
  generate(): string {
    return randomUUID();
  }
}