import { Schema, model, Types } from 'mongoose';

const schema = new Schema(
  {
    name: String,
    sinopsis: String,
    src: String,
    thumbnail: String,
    previewImage: String,
    order: Number,
    duration: Number,
    createdAt: { type: Date, default: new Date().toISOString() },
    serie: { type: Types.ObjectId, ref: 'Serie' },
  },
  { versionKey: false }
);

export const Episode = model('Episode', schema);
