import { Route } from '../shared/interfaces';
import { validateScheme } from '../middlewares';
import {
  schemeCreateEpisode,
  schemeEpisodeId,
  schemeUpdateEpisode,
} from '../validationSchemes';
import {
  createEpisode,
  findEpisodes,
  findById,
  deleteEpisode,
  updateEpisode,
} from '../controllers';

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
