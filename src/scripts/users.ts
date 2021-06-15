import bcrypt from 'bcryptjs';
import { Admin } from '../models/admin';
import { connectDb } from '../db/connection';

export const createUserAdmin = async (values: {
  email: string;
  username: string;
  password: string;
}) => {
  // eslint-disable-next-line no-useless-catch
  try {
    await connectDb();
    const hashPassword = await bcrypt.hash(values.password, 10);
    values.password = hashPassword;

    const doc = new Admin(values);
    await doc.save();
    doc.getChanges();

    return doc;
  } catch (reason) {
    throw reason;
  }
};
