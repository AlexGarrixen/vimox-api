import { Request, Response, NextFunction } from 'express';
import Boom from '@hapi/boom';

type Error_ = Error & Boom.Boom;

const errorBoomImplementation = (
  error: Error_,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!error.isBoom) next(Boom.badImplementation(error.message));
  else next(error);
};

const errorHandler = (
  error: Error_,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    output: { statusCode, payload },
  } = error;

  res.status(statusCode).json(payload);
};

export default {
  errorBoomImplementation,
  errorHandler,
};
