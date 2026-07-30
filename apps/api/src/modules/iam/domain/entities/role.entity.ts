import { Entity, EntityProps } from "../../../../shared/core/entity";

export interface RoleProps extends EntityProps {
  tenantId: string;

  name: string;
  slug: string;
}

export class Role extends Entity<RoleProps> {
  constructor(props: RoleProps) {
    super(props);
  }

  get tenantId() {
    return this.props.tenantId;
  }

  get name() {
    return this.props.name;
  }

  get slug() {
    return this.props.slug;
  }

  changeName(name: string): void {
    this.props.name = name;
  }

  changeSlug(slug: string): void {
    this.props.slug = slug;
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