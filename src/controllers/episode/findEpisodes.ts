import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { Episode } from '../../models/episode';

interface EpisodeQuerys {
  sort_createdAt?: 'asc' | 'desc';
  limit_items?: string;
  of_serieId?: string;
}

export const findEpisodes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { sort_createdAt, limit_items, of_serieId }: EpisodeQuerys = req.query;
  const sort: Record<string, any> = {};
  const limit = parseInt(limit_items || '12');
  let filter = {};

  if (sort_createdAt) sort.createdAt = sort_createdAt;

  if (of_serieId)
    filter = {
      ...filter,
      serie: Types.ObjectId(of_serieId),
    };

  try {
    const episodes = await Episode.find(filter)
      .sort(sort)
      .limit(limit)
      .populate('serie');

    res.status(200).json(episodes);
  } catch (e) {
    next(e);
  }
};
