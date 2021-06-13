import { Route } from '../types';
import { findTypes } from '../controllers/types/findTypes';
import { deleteType } from '../controllers/types/deleteType';
import { createType } from '../controllers/types/createType';
import validateScheme from '../middlewares/validateScheme';
import withAuth from '../middlewares/withAuth';
import {
  schemeTypeId,
  schemeCreateType,
} from '../utils/validationSchemes/types';

export const types: Route[] = [
  {
    path: '/',
    method: 'get',
    handlers: [findTypes],
  },
  {
    path: '/',
    method: 'post',
    handlers: [withAuth, validateScheme(schemeCreateType, 'body'), createType],
  },
  {
    path: '/:typeId',
    method: 'delete',
    handlers: [withAuth, validateScheme(schemeTypeId, 'params'), deleteType],
  },
];
