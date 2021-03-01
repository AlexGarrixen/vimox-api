import {
  DB_NAME,
  DB_PROD_NAME,
  DB_USER,
  DB_HOST,
  DB_PASSWORD,
} from '../shared/env';

const isProd = process.env.NODE_ENV === 'production';

const settings = {
  database: isProd ? DB_PROD_NAME : DB_NAME,
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
};

export default settings;
