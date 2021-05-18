import { Request } from 'express';
import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import { SECRET_JWT, SECRET_REFRESH_JWT, SECRET_RESET_PASSWORD } from './env';
import { JwtPayload } from '../types';

export const verifyRefreshToken = (token: string): Promise<JwtPayload> =>
  new Promise((res, rej) => {
    jwt.verify(token, SECRET_REFRESH_JWT as string, (error, token) => {
      if (error) rej(error);
      else res(token as JwtPayload);
    });
  });

export const verifyResetPasswordToken = (token: string): Promise<JwtPayload> =>
  new Promise((res, rej) => {
    jwt.verify(token, SECRET_RESET_PASSWORD as string, (error, token) => {
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

export const createResetPasswordToken = (
  payload: JwtPayload
): Promise<string | undefined> =>
  new Promise((res, rej) => {
    jwt.sign(
      payload,
      SECRET_RESET_PASSWORD as string,
      { expiresIn: '10m', subject: payload.email },
      (error, token) => {
        if (error) rej(error);
        else res(token);
      }
    );
  });

export const retrieveBearerToken = (req: Request) => {
  const header: string | undefined = req.headers['authorization'] as string;
  let token: null | JwtPayload = null;

  if (header && header.startsWith('Bearer')) {
    const [_, value] = header.split(' ');
    if (value) token = jwtDecode(value);
  }

  return token;
};
