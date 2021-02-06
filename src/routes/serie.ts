import { Route } from '../shared/interfaces';
import { validateScheme } from '../middlewares';
import {
  schemeCreateSerie,
  schemeSerieId,
  schemeUpdateSerie,
} from '../validationSchemes';
import {
  createSerie,
  findSeries,
  findSerieById,
  deleteSerie,
  updateSerie,
} from '../controllers';

export const serie: Route[] = [
  {
    method: 'get',
    path: '/series',
    handlers: [findSeries],
  },
  {
    method: 'get',
    path: '/series/:serieId',
    handlers: [validateScheme(schemeSerieId, 'params'), findSerieById],
  },
  {
    method: 'post',
    path: '/series',
    handlers: [validateScheme(schemeCreateSerie, 'body'), createSerie],
  },
  {
    method: 'put',
    path: '/series/:serieId',
    handlers: [validateScheme(schemeUpdateSerie, 'body'), updateSerie],
  },
  {
    method: 'delete',
    path: '/series/:serieId',
    handlers: [validateScheme(schemeSerieId, 'params'), deleteSerie],
  },
];
