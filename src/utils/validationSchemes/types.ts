import Joi from 'joi';
import { idScheme } from './id';

export const schemeTypeId = Joi.object({
  typeId: idScheme.required(),
});

export const schemeCreateType = Joi.object({
  name: Joi.string().required(),
});
