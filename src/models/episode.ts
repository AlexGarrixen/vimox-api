import { Schema, model, Types } from 'mongoose';

const schema = new Schema(
  {
    serie: { type: Types.ObjectId, ref: 'Serie' },
    name: String,
    sinopsis: String,
    src: String,
    thumbnail: String,
    previewImage: String,
    order: Number,
    createdAt: { type: Date, default: new Date().toISOString() },
  },
  { versionKey: false }
);

export const Episode = model('Episode', schema);
