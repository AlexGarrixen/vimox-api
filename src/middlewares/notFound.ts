import { Request, Response, NextFunction } from 'express';
import Boom from '@hapi/boom';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const {
    output: { payload, statusCode },
  } = Boom.notFound();

  res.status(statusCode).json(payload);
};

export default notFound;
