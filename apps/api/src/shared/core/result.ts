export class Result<T> {
  private constructor(
    public readonly success: boolean,
    public readonly data?: T,
    public readonly error?: string,
  ) {}

  static ok<T>(data?: T): Result<T> {
    return new Result<T>(true, data)
  }

  static fail<T = never>(error: string): Result<T> {
    return new Result<T>(false, undefined, error)
  }

  get isSuccess(): boolean {
    return this.success
  }

  get isFailure(): boolean {
    return !this.success
  }
}