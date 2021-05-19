import { findSerie } from '../controllers/search/findSerie';
import { Route } from '../types';

export const search: Route[] = [
  {
    path: '/serie',
    method: 'get',
    handlers: [findSerie],
  },
];
