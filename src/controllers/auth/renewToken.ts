import { Request, Response, NextFunction } from 'express';
import Boom from '@hapi/boom';
import {
  verifyRefreshToken,
  createRefreshToken,
  createToken,
} from '../../utils/jwt';

export const renewToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { refreshToken } = req.body;

  try {
    const tokenPayload = await verifyRefreshToken(refreshToken);
    const newToken = await createToken({
      email: tokenPayload.email,
      userId: tokenPayload.userId,
      role: tokenPayload.role,
    });
    const newRefreshToken = await createRefreshToken({
      email: tokenPayload.email,
      userId: tokenPayload.userId,
      role: tokenPayload.role,
    });

    res.status(200).json({ token: newToken, refreshToken: newRefreshToken });
  } catch (e) {
    next(Boom.unauthorized());
  }
};
