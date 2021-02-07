import { Schema, model } from 'mongoose';

const schema = new Schema(
  {
    name: String,
    createdAt: { type: Date, default: new Date().toISOString() },
  },
  { versionKey: false }
);

schema.index({ name: 'text' });

export const Gener = model('Gener', schema);
