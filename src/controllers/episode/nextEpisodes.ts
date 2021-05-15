import { NextFunction, Response, Request } from 'express';
import { Episode } from '../../models/episode';

interface FilterQuerys {
  limit_items?: string;
}

export const nextEpisodes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { limit_items }: FilterQuerys = req.query;
  const { episodeId } = req.params;
  const limitItems = parseInt(limit_items || '3');

  try {
    const episode = await Episode.findById(episodeId);
    const nextEpisodes = episode
      ? await Episode.find({
          serie: episode.serie,
          order: { $gt: episode.order },
        })
          .sort({ order: 1 })
          .limit(limitItems)
      : null;

    res.status(201).json(nextEpisodes);
  } catch (reason) {
    next(reason);
  }
};
