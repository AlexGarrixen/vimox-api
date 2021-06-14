import { Route } from '../types';
import { validateScheme } from '../middlewares';
import { createEpisode } from '../controllers/episode/createEpisode';
import { findEpisodes } from '../controllers/episode/findEpisodes';
import { findById } from '../controllers/episode/findById';
import { deleteEpisode } from '../controllers/episode/deleteEpisode';
import { updateEpisode } from '../controllers/episode/updateSerie';
import { nextEpisodes } from '../controllers/episode/nextEpisodes';
import withAuth from '../middlewares/withAuth';
import {
  schemeCreateEpisode,
  schemeEpisodeId,
  schemeUpdateEpisode,
} from '../utils/validationSchemes/episode';

export const episode: Route[] = [
  {
    method: 'get',
    path: '/',
    handlers: [findEpisodes],
  },
  {
    method: 'get',
    path: '/:episodeId',
    handlers: [validateScheme(schemeEpisodeId, 'params'), findById],
  },
  {
    method: 'get',
    path: '/:episodeId/next-episodes',
    handlers: [validateScheme(schemeEpisodeId, 'params'), nextEpisodes],
  },
  {
    method: 'post',
    path: '/',
    handlers: [
      withAuth('admin'),
      validateScheme(schemeCreateEpisode, 'body'),
      createEpisode,
    ],
  },
  {
    method: 'delete',
    path: '/:episodeId',
    handlers: [
      withAuth('admin'),
      validateScheme(schemeEpisodeId, 'params'),
      deleteEpisode,
    ],
  },
  {
    method: 'put',
    path: '/:episodeId',
    handlers: [
      withAuth('admin'),
      validateScheme(schemeEpisodeId, 'params'),
      validateScheme(schemeUpdateEpisode, 'body'),
      updateEpisode,
    ],
  },
];
