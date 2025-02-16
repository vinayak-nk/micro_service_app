import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode = 500;
  reason = 'Not Found'
  constructor() {
    super('Route not found')
    // Bcz we are extending a built in class
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  serializeErrors() {
    return [{ message: this.reason }]
  }
}
