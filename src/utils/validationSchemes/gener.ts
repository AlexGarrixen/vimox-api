import Joi from 'joi';
import { idScheme } from './id';

export const schemeGenerId = Joi.object({
  generId: idScheme,
});

export const schemeCreateGener = Joi.object({
  name: Joi.string().required(),
});
