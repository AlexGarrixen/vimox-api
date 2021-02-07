import { Route } from '../shared/interfaces';
import { validateScheme } from '../middlewares';
import { schemeCreateGener, schemeGenerId } from '../validationSchemes';
import {
  findGeners,
  findGenerById,
  createGener,
  deleteGener,
} from '../controllers';

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
