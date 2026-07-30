export abstract class ValueObject<T> {
  protected readonly props: Readonly<T>

  protected constructor(props: T) {
    this.props = Object.freeze(props)
  }

  public equals(valueObject?: ValueObject<T>): boolean {
    if (!valueObject) return false

    if (this === valueObject) return true

    return JSON.stringify(this.props) === JSON.stringify(valueObject.props)
  }
}