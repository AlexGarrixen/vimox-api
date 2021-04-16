import Joi from 'joi';

export const schemeSignup = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
});

export const schemeEmailConfirmation = Joi.object({
  emailToken: Joi.string().required(),
});

export const schemeForgotPassword = Joi.object({
  email: Joi.string().required(),
});
