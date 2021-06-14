import { Router, RequestHandler } from 'express';
export interface Route {
  method: keyof Pick<Router, 'get' | 'post' | 'put' | 'delete' | 'patch'>;
  path: string;
  handlers: RequestHandler[];
}
export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}
