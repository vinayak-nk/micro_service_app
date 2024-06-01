import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';
// import { RequestValidationError } from '../errors/request-validation-error';
// import { DatabaseConnectionError } from '../errors/database-connection-error';


const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

  /*
    if (err instanceof RequestValidationError) {
      const formattedErrors = err.errors.map(error => {
        if (error.type === 'field') return { message: error.msg, field: error.path }
        else return { message: error.msg }
      })
      console.log('request validation error')
      return res.status(400).send({ errors: formattedErrors })
    }
    if (err instanceof DatabaseConnectionError) {
      console.log('DB connection error')
      return res.status(500).send({ errors: [{ message: err.reason }] })
    }
  */

  /*
    if (err instanceof RequestValidationError) return res.status(err.statusCode).send({ errors: err.serializeErrors() })
    if (err instanceof DatabaseConnectionError) return res.status(err.statusCode).send({ errors: err.serializeErrors() })

    above two lines replaced with CustomError
  */

  
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() })
  }

  res.status(400).send({
    errors: [{ message: 'Something went wrong' }]
  });
};

export { errorHandler };
