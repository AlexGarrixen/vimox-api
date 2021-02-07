import { Schema, model, Types } from 'mongoose';

const schema = new Schema(
  {
    name: String,
    sinopsis: String,
    duration: Number,
    imageSm: String,
    imageMd: String,
    imageLg: String,
    createdAt: { type: Date, default: new Date().toISOString() },
    episodes: [{ type: Types.ObjectId, default: [], ref: 'Episode' }],
    geners: [{ type: Types.ObjectId, default: [], ref: 'Gener' }],
    titles: [String],
  },
  { versionKey: false }
);

schema.index({ titles: 'text' });

export const Serie = model('Serie', schema);
