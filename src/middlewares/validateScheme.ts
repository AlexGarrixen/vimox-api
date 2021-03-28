import { Response, Request, NextFunction } from 'express';
import { Schema } from 'joi';
import Boom from '@hapi/boom';

const validateScheme = (scheme: Schema, source: keyof Request = 'body') => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = scheme.validate(req[source]);

  error ? next(Boom.badRequest(error.message)) : next();
};

export default validateScheme;
