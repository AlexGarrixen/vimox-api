import { Schema, model, Document } from 'mongoose';

interface TypeDoc extends Document {
  name: string;
  createdAt: Date;
}

const schema = new Schema(
  {
    name: String,
    createdAt: { type: Date, default: new Date().toISOString() },
  },
  { versionKey: false }
);

export const TypeModel = model<TypeDoc>('Type', schema);
