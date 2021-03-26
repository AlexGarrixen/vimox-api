import Joi from 'joi';
import { idScheme } from './id';

export const schemeSerieId = Joi.object({
  serieId: idScheme,
});

export const schemeCreateSerie = Joi.object({
  name: Joi.string().required(),
  sinopsis: Joi.string().required(),
  imageSm: Joi.string().required(),
  imageMd: Joi.string().required(),
  imageLg: Joi.string().required(),
  episodes: Joi.array().items(idScheme),
  geners: Joi.array().items(idScheme),
  titles: Joi.array().items(Joi.string()),
  type: Joi.string().required(),
});

export const schemeUpdateSerie = Joi.object({
  name: Joi.string(),
  sinopsis: Joi.string(),
  imageSm: Joi.string(),
  imageMd: Joi.string(),
  imageLg: Joi.string(),
  episodes: Joi.array().items(idScheme),
  geners: Joi.array().items(idScheme),
  titles: Joi.array().items(Joi.string()),
  type: Joi.string(),
});
