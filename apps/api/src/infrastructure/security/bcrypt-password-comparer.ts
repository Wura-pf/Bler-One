import bcrypt from "bcrypt";

import { PasswordComparer } from "../../modules/iam/application/services/password-comparer";

export class BcryptPasswordComparer implements PasswordComparer {
  async compare(
    plainPassword: string,
    passwordHash: string
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, passwordHash);
  }
}