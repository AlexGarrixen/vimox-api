import cors, { CorsOptions } from 'cors';

const isProd = process.env.NODE_ENV === 'production';
const whitelist: string[] = [];

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
