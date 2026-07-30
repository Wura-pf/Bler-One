import bcrypt from "bcrypt";
import { PasswordHasher } from "../../application/services/password-hasher";

export class BcryptPasswordHasher implements PasswordHasher {
  private static readonly SALT_ROUNDS = 12;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, BcryptPasswordHasher.SALT_ROUNDS);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}