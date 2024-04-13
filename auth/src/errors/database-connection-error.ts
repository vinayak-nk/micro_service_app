
export class DatabaseConnectionError extends Error {
  reason = 'Error connecting to DB'
  constructor() {
    super()

    // Bcz we are extending a built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }
}
