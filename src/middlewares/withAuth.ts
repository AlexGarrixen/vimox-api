import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import Boom from '@hapi/boom';
import '../utils/authStrategies';

const withAuth =
  (role: 'user' | 'admin') =>
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', (error, user) => {
      if (error || !user) return next(Boom.unauthorized());
      if (user.role !== role) return next(Boom.unauthorized());

      req.login(user, { session: false }, (err) => {
        if (err) next(err);

        next();
      });
    })(req, res, next);
  };

export default withAuth;
