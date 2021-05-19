import { Route } from '../types';
import { validateScheme } from '../middlewares';
import {
  schemeCreateGener,
  schemeGenerId,
} from '../utils/validationSchemes/gener';
import { findGeners } from '../controllers/gener/findGeners';
import { findGenerById } from '../controllers/gener/findGenerById';
import { createGener } from '../controllers/gener/createGener';
import { deleteGener } from '../controllers/gener/deleteGener';

export const gener: Route[] = [
  {
    method: 'get',
    path: '/',
    handlers: [findGeners],
  },
  {
    method: 'get',
    path: '/:generId',
    handlers: [validateScheme(schemeGenerId, 'params'), findGenerById],
  },
  {
    method: 'post',
    path: '/',
    handlers: [validateScheme(schemeCreateGener, 'body'), createGener],
  },
  {
    method: 'delete',
    path: '/:generId',
    handlers: [validateScheme(schemeGenerId, 'params'), deleteGener],
  },
];
