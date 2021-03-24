import dotenv from 'dotenv';

dotenv.config();

export const DB_NAME = process.env.DB_NAME;
export const DB_PROD_NAME = process.env.DB_PROD_NAME;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_HOST = process.env.DB_HOST;
export const SECRET_JWT = process.env.SECRET_JWT;
export const SECRET_REFRESH_JWT = process.env.SECRET_REFRESH_JWT;
export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
