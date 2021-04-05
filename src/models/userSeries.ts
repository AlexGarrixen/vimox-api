import { Schema, model, Types, Document } from 'mongoose';

interface UserSeriesDoc extends Document {
  userId: string;
  serie: Types.ObjectId;
  lastEpisodeWatched: Types.ObjectId;
}

const schema = new Schema(
  {
    userId: String,
    serie: { type: Types.ObjectId, ref: 'Serie' },
    lastEpisodeWatched: { type: Types.ObjectId, ref: 'Episode', default: null },
  },
  { versionKey: false }
);

export const UserSeries = model<UserSeriesDoc>('users_series', schema);
