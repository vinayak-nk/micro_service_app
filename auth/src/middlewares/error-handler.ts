import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

  if (err instanceof RequestValidationError) {
    const formattedError = err.errors.map(error => {
      if (error.type === 'field') {
        return { message: error.msg, field: error.path }
      }
    })
    return res.status(400).send({ errors: formattedError })

  } else if (err instanceof DatabaseConnectionError) {
    return res.status(500).send({ errors: [{ message: err.reason }] })
  }

  res.status(400).send({
    errors: [{ message: 'Something went wrong' }]
  });
};

export { errorHandler };
