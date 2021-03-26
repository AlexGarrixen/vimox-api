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
    path: '/geners',
    handlers: [findGeners],
  },
  {
    method: 'get',
    path: '/geners/:generId',
    handlers: [validateScheme(schemeGenerId, 'params'), findGenerById],
  },
  {
    method: 'post',
    path: '/geners',
    handlers: [validateScheme(schemeCreateGener, 'body'), createGener],
  },
  {
    method: 'delete',
    path: '/geners/:generId',
    handlers: [validateScheme(schemeGenerId, 'params'), deleteGener],
  },
];
