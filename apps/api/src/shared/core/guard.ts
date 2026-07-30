export class Guard {
  static againstNullOrUndefined<T>(
    value: T | null | undefined,
    fieldName: string,
  ): void {
    if (value === null || value === undefined) {
      throw new Error(`${fieldName} is required.`)
    }
  }

  static againstEmptyString(
    value: string,
    fieldName: string,
  ): void {
    if (value.trim().length === 0) {
      throw new Error(`${fieldName} cannot be empty.`)
    }
  }

  static againstMinLength(
    value: string,
    min: number,
    fieldName: string,
  ): void {
    if (value.length < min) {
      throw new Error(
        `${fieldName} must have at least ${min} characters.`,
      )
    }
  }

  static againstMaxLength(
    value: string,
    max: number,
    fieldName: string,
  ): void {
    if (value.length > max) {
      throw new Error(
        `${fieldName} must have at most ${max} characters.`,
      )
    }
  }

  static againstEmptyArray<T>(
    value: T[],
    fieldName: string,
  ): void {
    if (value.length === 0) {
      throw new Error(`${fieldName} cannot be empty.`)
    }
  }
}