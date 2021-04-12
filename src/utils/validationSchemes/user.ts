import Joi from 'joi';
import { idScheme } from './id';

export const schemeUserId = Joi.object({
  userId: idScheme.required(),
});

export const schemeAddSerie = Joi.object({
  serieId: idScheme.required(),
});

export const schemeDeleteSerie = Joi.object({
  serieId: idScheme.required(),
  userId: idScheme.required(),
});

export const schemeUpdateLastEpisodeWatchedOfSerie = Joi.object({
  lastEpisodeWatched: Joi.string().required(),
});

export const schemeUpdateSerieParams = Joi.object({
  userId: idScheme.required(),
  serieId: idScheme.required(),
});
