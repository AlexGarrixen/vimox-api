import Joi from 'joi';

export const schemeSignup = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().min(8).required(),
	email: Joi.string().email().required(),
});
