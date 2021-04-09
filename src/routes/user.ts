import { Route } from '../types';
import { addSerie } from '../controllers/user/addSerie';
import { deleteSerie } from '../controllers/user/deleteSerie';
import { getSeries } from '../controllers/user/getSeries';
import { updateSerie } from '../controllers/user/updateSerie';
import {
  schemeUserId,
  schemeAddSerie,
  schemeDeleteSerie,
  schemeUpdateSerie,
  schemeUpdateSerieParams,
} from '../utils/validationSchemes/user';
import validateScheme from '../middlewares/validateScheme';
import withAuth from '../middlewares/withAuth';

export const user: Route[] = [
  {
    path: '/user/:userId/series',
    method: 'get',
    handlers: [withAuth, validateScheme(schemeUserId, 'params'), getSeries],
  },
  {
    path: '/user/:userId/series',
    method: 'post',
    handlers: [
      withAuth,
      validateScheme(schemeUserId, 'params'),
      validateScheme(schemeAddSerie, 'body'),
      addSerie,
    ],
  },
  {
    path: '/user/:userId/series/:serieId',
    method: 'put',
    handlers: [
      withAuth,
      validateScheme(schemeUpdateSerieParams, 'params'),
      validateScheme(schemeUpdateSerie, 'body'),
      updateSerie,
    ],
  },
  {
    path: '/user/:userId/series/:serieId',
    method: 'delete',
    handlers: [
      withAuth,
      validateScheme(schemeDeleteSerie, 'params'),
      deleteSerie,
    ],
  },
];
