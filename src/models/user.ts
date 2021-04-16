import { Schema, model, Document } from 'mongoose';

interface UserDoc extends Document {
  email: string;
  password: string;
  username: string;
  createdAt: string;
  verified: boolean;
  emailToken: string | null;
  resetPasswordToken: string | null;
}

const schema = new Schema(
  {
    username: String,
    email: { type: String, unique: true },
    password: String,
    createdAt: { type: Date, default: new Date().toISOString() },
    verified: { type: Boolean, default: false },
    emailToken: { type: String, default: null },
    resetPasswordToken: { type: String, default: null },
  },
  { versionKey: false }
);

export const User = model<UserDoc>('User', schema);
