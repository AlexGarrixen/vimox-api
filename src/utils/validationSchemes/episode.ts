import Joi from 'joi';
import { idScheme } from './id';

export const schemeEpisodeId = Joi.object({
  episodeId: idScheme,
});

export const schemeCreateEpisode = Joi.object({
  name: Joi.string().required(),
  sinopsis: Joi.string(),
  src: Joi.string(),
  thumbnail: Joi.string(),
  order: Joi.number().required(),
  duration: Joi.number().required(),
  serie: Joi.string().required(),
  release: Joi.date().required(),
});

export const schemeUpdateEpisode = Joi.object({
  name: Joi.string(),
  sinopsis: Joi.string(),
  src: Joi.string(),
  thumbnail: Joi.string(),
  order: Joi.number(),
  duration: Joi.number(),
  serie: Joi.string(),
  release: Joi.date(),
});
