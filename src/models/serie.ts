import { Schema, model, Types, Document } from 'mongoose';

interface SerieDoc extends Document {
  name: string;
  sinopsis: string;
  imageSm: string;
  imageMd: string;
  imageLg: boolean;
  createdAt: string;
  episodes: string[];
  geners: string[];
  titles: string[];
  type: string;
}

const schema = new Schema(
  {
    name: String,
    sinopsis: String,
    imageSm: String,
    imageMd: String,
    imageLg: String,
    createdAt: { type: Date, default: new Date().toISOString() },
    episodes: [{ type: Types.ObjectId, default: [], ref: 'Episode' }],
    geners: [{ type: Types.ObjectId, default: [], ref: 'Gener' }],
    titles: [String],
    type: String,
  },
  { versionKey: false }
);

schema.index({ titles: 'text' });

export const Serie = model<SerieDoc>('Serie', schema);
