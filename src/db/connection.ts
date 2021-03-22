import mongoose from 'mongoose';
import { databaseSettings } from '../config';

const isProduction = process.env.NODE_ENV === 'production';
const { database, host, password, username } = databaseSettings;

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
