import { CustomError } from './custom-error';

export class BarRequestError extends CustomError {
  statusCode = 400;

  constructor(public message: string) {
    super(message);
    // Bcz we are extending a built in class
    Object.setPrototypeOf(this, BarRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
