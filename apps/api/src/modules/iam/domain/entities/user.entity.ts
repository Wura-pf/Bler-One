import { Entity, EntityProps } from "../../../../shared/core/entity";

export interface UserProps extends EntityProps {
  tenantId: string;

  firstName: string;
  lastName: string;

  email: string;
  username?: string | null;

  passwordHash: string;

  active: boolean;
  emailVerified: boolean;
}

export class User extends Entity<UserProps> {
  constructor(props: UserProps) {
    super(props);
  }

  get tenantId() {
    return this.props.tenantId;
  }

  get firstName() {
    return this.props.firstName;
  }

  get lastName() {
    return this.props.lastName;
  }

  get fullName() {
    return `${this.props.firstName} ${this.props.lastName}`;
  }

  get email() {
    return this.props.email;
  }

  get username() {
    return this.props.username;
  }

  get passwordHash() {
    return this.props.passwordHash;
  }

  get active() {
    return this.props.active;
  }

  get emailVerified() {
    return this.props.emailVerified;
  }

  changeName(firstName: string, lastName: string): void {
    this.props.firstName = firstName;
    this.props.lastName = lastName;
  }

  changeEmail(email: string): void {
    this.props.email = email;
  }

  changeUsername(username: string | null): void {
    this.props.username = username;
  }

  changePassword(passwordHash: string): void {
    this.props.passwordHash = passwordHash;
  }

  activate(): void {
    this.props.active = true;
  }

  deactivate(): void {
    this.props.active = false;
  }

  verifyEmail(): void {
    this.props.emailVerified = true;
  }

  incrementVersion(): void {
    this.props.version += 1;
  }

  markAsDeleted(): void {
    this.props.deletedAt = new Date();
  }

  restore(): void {
    this.props.deletedAt = null;
  }
}