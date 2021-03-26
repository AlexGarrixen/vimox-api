import { Router, RequestHandler } from 'express';
export interface Route {
  method: keyof Pick<Router, 'get' | 'post' | 'put' | 'delete' | 'patch'>;
  path: string;
  handlers: RequestHandler[];
}
export interface Episode {
  serie: string;
  name: string;
  sinopsis: string;
  src: string;
  thumbnail: string;
  previewImage: string;
  order: number;
  createdAt: string;
}
