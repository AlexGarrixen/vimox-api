import Joi from 'joi';

export const idScheme = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
