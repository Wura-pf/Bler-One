import { Entity, EntityProps } from './entity'

export interface DomainEvent {
  occurredOn: Date
  eventName: string
}

export abstract class AggregateRoot<
  T extends EntityProps,
> extends Entity<T> {
  private readonly domainEvents: DomainEvent[] = []

  protected addDomainEvent(event: DomainEvent): void {
    this.domainEvents.push(event)
  }

  public getDomainEvents(): DomainEvent[] {
    return [...this.domainEvents]
  }

  public clearDomainEvents(): void {
    this.domainEvents.length = 0
  }

  public hasDomainEvents(): boolean {
    return this.domainEvents.length > 0
  }
}