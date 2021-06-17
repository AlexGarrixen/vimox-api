import { Schema, model, Document } from 'mongoose';
export interface SerieDoc extends Document {
  name: string;
  sinopsis: string;
  thumbnail: string;
  bannerImage: string;
  createdAt: Date;
  release: Date;
  geners: string[];
  titles: string[];
  type: string;
}

const schema = new Schema(
  {
    name: String,
    sinopsis: String,
    thumbnail: String,
    bannerImage: String,
    createdAt: { type: Date, default: new Date().toISOString() },
    release: Date,
    geners: [String],
    titles: [String],
    type: String,
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

schema.index({ titles: 'text' });

schema.virtual('episodes', {
  ref: 'Episode',
  localField: '_id',
  foreignField: 'serie',
  count: true,
});

export const Serie = model<SerieDoc>('Serie', schema);
