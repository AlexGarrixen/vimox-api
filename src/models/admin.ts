import { Schema, model, Document } from 'mongoose';

interface UserAdminDoc extends Document {
  email: string;
  password: string;
  username: string;
  createAt: Date;
  role: string;
}

const adminSchema = new Schema(
  {
    email: String,
    username: String,
    password: String,
    createdAt: { type: Date, default: new Date().toISOString() },
    role: { type: String, default: 'admin' },
  },
  { versionKey: false }
);

export const Admin = model<UserAdminDoc>('Admin', adminSchema);
