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
    path: '/',
    handlers: [findSeries],
  },
  {
    method: 'get',
    path: '/:serieId',
    handlers: [validateScheme(schemeSerieId, 'params'), findSerieById],
  },
  {
    method: 'post',
    path: '/',
    handlers: [validateScheme(schemeCreateSerie, 'body'), createSerie],
  },
  {
    method: 'put',
    path: '/:serieId',
    handlers: [validateScheme(schemeUpdateSerie, 'body'), updateSerie],
  },
  {
    method: 'delete',
    path: '/:serieId',
    handlers: [validateScheme(schemeSerieId, 'params'), deleteSerie],
  },
];
