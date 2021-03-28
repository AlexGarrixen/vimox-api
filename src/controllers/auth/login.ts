import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import Boom from '@hapi/boom';
import { createToken, createRefreshToken } from '../../utils/jwt';

export const login = async (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate('basic', (error, user) => {
    if (error) return next(error);
    if (!user) return next(Boom.unauthorized());

    req.login(user, { session: false }, async (err) => {
      if (err) return next(err);

      if (!user) return next(Boom.unauthorized());

      try {
        const tokenPayload = { email: user.email, userId: user._id };
        const token = await createToken(tokenPayload);
        const refreshToken = await createRefreshToken(tokenPayload);

        res.status(200).json({
          user,
          token,
          refreshToken,
        });
      } catch (e) {
        next(e);
      }
    });
  })(req, res, next);
