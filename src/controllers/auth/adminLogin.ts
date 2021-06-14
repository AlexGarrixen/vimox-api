import { Response, Request, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import Boom from '@hapi/boom';
import _omit from 'lodash.omit';
import { Admin } from '../../models/admin';
import { createToken, createRefreshToken } from '../../utils/jwt';

export const adminLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers.authorization || '';
  const credentialsBase64 = authorizationHeader.split(' ')[1];

  if (!credentialsBase64) return next(Boom.unauthorized());

  const [email, password] = Buffer.from(credentialsBase64, 'base64')
    .toString('utf-8')
    .split(':');

  try {
    const user = await Admin.findOne(
      { email: email },
      '_id email role password'
    ).lean();

    if (!user) return next(Boom.unauthorized());
    if (!(await bcrypt.compare(password, user.password)))
      return next(Boom.unauthorized());

    const tokenPayload = {
      email: user.email,
      userId: user._id,
      role: user.role,
    };
    const token = await createToken(tokenPayload);
    const refreshToken = await createRefreshToken(tokenPayload);

    res
      .status(200)
      .json({ user: _omit(user, ['password']), token, refreshToken });
  } catch (reason) {
    next(reason);
  }
};
