import { Schema, model, Types, Document } from 'mongoose';

interface EpisodeDoc extends Document {
  createdAt: string;
  name: string;
  sinopsis: string;
  src: string;
  thumbnail: string;
  previewImage: string;
  order: number;
  duration: number;
  serie: string;
}

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

export const Episode = model<EpisodeDoc>('Episode', schema);
