import cors, { CorsOptions } from 'cors';
import { ORIGIN_CLIENT } from '../utils/env';

const isProd = process.env.NODE_ENV === 'production';
const whitelist: string[] = [ORIGIN_CLIENT as string];

const options: CorsOptions = {
  origin: (origin, cb) => {
    if (isProd) {
      !origin || whitelist.indexOf(origin) === -1
        ? cb(new Error('Not allowed by CORS'))
        : cb(null, true);
    } else cb(null, true);
  },
};

const corsOrigin = () => cors(options);

export default corsOrigin;
