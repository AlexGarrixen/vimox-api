import { Schema, model, Document } from 'mongoose';

interface UserDoc extends Document {
  email: string;
  password: string;
  username: string;
  createdAt: string;
}

const schema = new Schema(
  {
    username: String,
    email: { type: String, unique: true },
    password: String,
    createdAt: { type: Date, default: new Date().toISOString() },
  },
  { versionKey: false }
);

export const User = model<UserDoc>('User', schema);
