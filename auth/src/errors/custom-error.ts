export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message); // Only for logging purpose. passing message to Error class. Eg: throw new Error('error text)
    Object.setPrototypeOf(this, CustomError.prototype)
  }

  abstract serializeErrors(): {
    message: string;
    field?: string;
  }[];
}