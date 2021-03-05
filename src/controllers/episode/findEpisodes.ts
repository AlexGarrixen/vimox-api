import { Request, Response, NextFunction } from 'express';
import { Episode } from '../../models';

interface EpisodeQuerys {
  sort_createdAt?: 'asc' | 'desc';
  limit_items?: string;
}

export const findEpisodes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { sort_createdAt, limit_items }: EpisodeQuerys = req.query;
  const sort: Record<string, any> = {};
  const limit = parseInt(limit_items || '12');

  if (sort_createdAt) sort.createdAt = sort_createdAt;

  try {
    const episodes = await Episode.find()
      .sort(sort)
      .limit(limit)
      .populate('serie');

    res.status(200).json(episodes);
  } catch (e) {
    next(e);
  }
};
