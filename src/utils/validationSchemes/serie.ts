import Joi from 'joi';
import { idScheme } from './id';

export const schemeSerieId = Joi.object({
  serieId: idScheme,
});

export const schemeCreateSerie = Joi.object({
  name: Joi.string().required(),
  sinopsis: Joi.string(),
  thumbnail: Joi.string(),
  bannerImage: Joi.string(),
  geners: Joi.array().items(Joi.string()),
  titles: Joi.array().items(Joi.string()),
  release: Joi.date(),
  type: Joi.string().required(),
});

export const schemeUpdateSerie = Joi.object({
  name: Joi.string(),
  sinopsis: Joi.string(),
  thumbnail: Joi.string(),
  bannerImage: Joi.string(),
  geners: Joi.array().items(Joi.string()),
  titles: Joi.array().items(Joi.string()),
  release: Joi.date(),
  type: Joi.string(),
});
