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

export const user: Route[] = [
  {
    path: '/user/:userId/series',
    method: 'get',
    handlers: [validateScheme(schemeUserId, 'params'), getSeries],
  },
  {
    path: '/user/:userId/series',
    method: 'post',
    handlers: [
      validateScheme(schemeUserId, 'params'),
      validateScheme(schemeAddSerie, 'body'),
      addSerie,
    ],
  },
  {
    path: '/user/:userId/series/:serieId',
    method: 'put',
    handlers: [
      validateScheme(schemeUpdateSerieParams, 'params'),
      validateScheme(schemeUpdateSerie, 'body'),
      updateSerie,
    ],
  },
  {
    path: '/user/:userId/series/:serieId',
    method: 'delete',
    handlers: [validateScheme(schemeDeleteSerie, 'params'), deleteSerie],
  },
];
