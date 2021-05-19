import { Express, Router } from 'express';
import { Route } from '../types';

const router = Router();

export const createRoutes = (
  basePath: string,
  routes: Route[],
  app: Express
) => {
  routes.forEach(({ path, method, handlers }) => {
    const route = `${basePath}${path}`;
    router[method](route, handlers);
  });

  app.use('/', router);
};
