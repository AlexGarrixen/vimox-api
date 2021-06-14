import { Route } from '../types';
import { addSerie } from '../controllers/user/addSerie';
import { deleteSerie } from '../controllers/user/deleteSerie';
import { getSeries } from '../controllers/user/getSeries';
import { getOneSerie } from '../controllers/user/getOneSerie';
import { updateLastEpisodeWatched } from '../controllers/user/updateLastEpisodeWatched';
import {
  schemeUserId,
  schemeAddSerie,
  schemeDeleteSerie,
  schemeUpdateLastEpisodeWatchedOfSerie,
  schemeUpdateSerieParams,
  schemeGetOneSerie,
} from '../utils/validationSchemes/user';
import validateScheme from '../middlewares/validateScheme';
import withAuth from '../middlewares/withAuth';

export const user: Route[] = [
  {
    path: '/:userId/series',
    method: 'get',
    handlers: [
      withAuth('user'),
      validateScheme(schemeUserId, 'params'),
      getSeries,
    ],
  },
  {
    path: '/:userId/series/:serieId',
    method: 'get',
    handlers: [
      withAuth('user'),
      validateScheme(schemeGetOneSerie, 'params'),
      getOneSerie,
    ],
  },
  {
    path: '/:userId/series',
    method: 'post',
    handlers: [
      withAuth('user'),
      validateScheme(schemeUserId, 'params'),
      validateScheme(schemeAddSerie, 'body'),
      addSerie,
    ],
  },
  {
    path: '/:userId/series/:serieId/last-episode-watched',
    method: 'put',
    handlers: [
      withAuth('user'),
      validateScheme(schemeUpdateSerieParams, 'params'),
      validateScheme(schemeUpdateLastEpisodeWatchedOfSerie, 'body'),
      updateLastEpisodeWatched,
    ],
  },
  {
    path: '/:userId/series/:serieId',
    method: 'delete',
    handlers: [
      withAuth('user'),
      validateScheme(schemeDeleteSerie, 'params'),
      deleteSerie,
    ],
  },
];
