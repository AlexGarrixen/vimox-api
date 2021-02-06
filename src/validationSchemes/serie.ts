import Joi from 'joi';
import { idScheme } from './id';

export const schemeSerieId = Joi.object({
  serieId: idScheme,
});

export const schemeCreateSerie = Joi.object({
  name: Joi.string().required(),
  sinopsis: Joi.string().required(),
  duration: Joi.number().required(),
  imageSm: Joi.string().required(),
  imageMd: Joi.string().required(),
  imageLg: Joi.string().required(),
  episodes: Joi.array().items(idScheme),
});

export const schemeUpdateSerie = Joi.object({
  name: Joi.string(),
  sinopsis: Joi.string(),
  duration: Joi.number(),
  imageSm: Joi.string(),
  imageMd: Joi.string(),
  imageLg: Joi.string(),
  episodes: Joi.array().items(idScheme),
});
