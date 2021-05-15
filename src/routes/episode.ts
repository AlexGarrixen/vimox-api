import { Route } from '../types';
import { validateScheme } from '../middlewares';
import { createEpisode } from '../controllers/episode/createEpisode';
import { findEpisodes } from '../controllers/episode/findEpisodes';
import { findById } from '../controllers/episode/findById';
import { deleteEpisode } from '../controllers/episode/deleteEpisode';
import { updateEpisode } from '../controllers/episode/updateSerie';
import { nextEpisodes } from '../controllers/episode/nextEpisodes';
import {
  schemeCreateEpisode,
  schemeEpisodeId,
  schemeUpdateEpisode,
} from '../utils/validationSchemes/episode';

export const episode: Route[] = [
  {
    method: 'get',
    path: '/episodes',
    handlers: [findEpisodes],
  },
  {
    method: 'get',
    path: '/episodes/:episodeId',
    handlers: [validateScheme(schemeEpisodeId, 'params'), findById],
  },
  {
    method: 'get',
    path: '/episodes/:episodeId/next-episodes',
    handlers: [validateScheme(schemeEpisodeId, 'params'), nextEpisodes],
  },
  {
    method: 'post',
    path: '/episodes',
    handlers: [validateScheme(schemeCreateEpisode, 'body'), createEpisode],
  },
  {
    method: 'delete',
    path: '/episodes/:episodeId',
    handlers: [validateScheme(schemeEpisodeId, 'params'), deleteEpisode],
  },
  {
    method: 'put',
    path: '/episodes/:episodeId',
    handlers: [
      validateScheme(schemeEpisodeId, 'params'),
      validateScheme(schemeUpdateEpisode, 'body'),
      updateEpisode,
    ],
  },
];
