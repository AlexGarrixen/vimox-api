import { Route } from '../types';
import { validateScheme } from '../middlewares';
import { createSerie } from '../controllers/serie/createSerie';
import { findSeries } from '../controllers/serie/findSeries';
import { findSerieById } from '../controllers/serie/findSerieById';
import { deleteSerie } from '../controllers/serie/deleteSerie';
import { updateSerie } from '../controllers/serie/updateSerie';
import {
  schemeCreateSerie,
  schemeSerieId,
  schemeUpdateSerie,
} from '../utils/validationSchemes/serie';

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
