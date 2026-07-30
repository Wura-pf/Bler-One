export interface EntityProps {
  id: string;

  createdAt: Date;
  updatedAt: Date;

  deletedAt: Date | null;

  version: number;
}

export abstract class Entity<T extends EntityProps> {
  protected props: T;

  constructor(props: T) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get deletedAt(): Date | null {
    return this.props.deletedAt;
  }

  get version(): number {
    return this.props.version;
  }

  protected touch(): void {
    this.props.updatedAt = new Date();
    this.props.version++;
  }
}