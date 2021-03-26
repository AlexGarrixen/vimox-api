import mongoose from 'mongoose';
import { settings } from '../config/database';

const isProduction = process.env.NODE_ENV === 'production';
const { database, host, password, username } = settings;

const uri = `mongodb+srv://${username}:${password}@${host}/${database}?retryWrites=true&w=majority`;

export const connectDb = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      autoIndex: isProduction ? false : true,
      useFindAndModify: false,
    });

    console.info('Success connection db');
  } catch (e) {
    console.error('Error conenction db:', e);
  }
};
