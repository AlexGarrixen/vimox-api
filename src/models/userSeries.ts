import { Schema, model, Types, Document } from 'mongoose';

interface UserSeriesDoc extends Document {
  userId: string;
  serie: Types.ObjectId;
  lastEpisodeWatched: number;
}

const schema = new Schema(
  {
    userId: Types.ObjectId,
    serie: { type: Types.ObjectId, ref: 'Serie' },
    lastEpisodeWatched: { type: Number, default: 0 },
  },
  { versionKey: false }
);

export const UserSeries = model<UserSeriesDoc>('users_series', schema);
