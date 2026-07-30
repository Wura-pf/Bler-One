export interface PasswordComparer {
  compare(
    plainPassword: string,
    passwordHash: string
  ): Promise<boolean>;
}