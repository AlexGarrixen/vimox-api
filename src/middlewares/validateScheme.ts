import { Response, Request, NextFunction } from 'express';
import { Schema } from 'joi';

const validateScheme = (scheme: Schema, source: keyof Request = 'body') => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = scheme.validate(req[source]);

  error ? res.status(400).json({ message: error.message }) : next();
};

export default validateScheme;
