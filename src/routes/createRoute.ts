import { Express, Router } from 'express';
import { Route } from '../shared/interfaces';

const router = Router();

export const createRoute = (app: Express, routes: Route[]) => {
  app.use('/', router);

  routes.forEach(({ path, method, handlers }) => {
    router[method](path, ...handlers);
  });
};
