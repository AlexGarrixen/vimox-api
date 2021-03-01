import { Request, Response, NextFunction } from 'express';
import { Episode } from '../../models';

interface EpisodeQuerys {
  sort_createdAt?: 'asc' | 'desc';
}

export const findEpisodes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { sort_createdAt }: EpisodeQuerys = req.query;
  const sort: Record<string, any> = {};

  if (sort_createdAt) sort.createdAt = sort_createdAt;

  try {
    const episodes = await Episode.find().sort(sort).populate('serie');

    res.status(200).json(episodes);
  } catch (e) {
    next(e);
  }
};
