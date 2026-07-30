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
    this.touch();
  }

  changeSlug(slug: string): void {
    this.props.slug = slug;
    this.touch();
  }

  markAsDeleted(): void {
    this.props.deletedAt = new Date();
    this.touch();
  }

  restore(): void {
    this.props.deletedAt = null;
    this.touch();
  }
}