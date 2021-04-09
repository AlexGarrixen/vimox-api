import jwt from 'jsonwebtoken';
import { SECRET_JWT, SECRET_REFRESH_JWT } from './env';

type JwtPayload = {
  userId: string;
  email: string;
};

export const verifyRefreshToken = (token: string): Promise<JwtPayload> =>
  new Promise((res, rej) => {
    jwt.verify(token, SECRET_REFRESH_JWT as string, (error, token) => {
      if (error) rej(error);
      else res(token as JwtPayload);
    });
  });

export const createToken = (payload: JwtPayload) =>
  new Promise((res, rej) => {
    jwt.sign(
      payload,
      SECRET_JWT as string,
      { expiresIn: '30m', subject: payload.email },
      (error, token) => {
        if (error) rej(error);
        else res(token);
      }
    );
  });

export const createRefreshToken = (payload: JwtPayload) =>
  new Promise((res, rej) => {
    jwt.sign(
      payload,
      SECRET_REFRESH_JWT as string,
      { expiresIn: '1h', subject: payload.email },
      (error, token) => {
        if (error) rej(error);
        else res(token);
      }
    );
  });
