import { Request, Response, NextFunction } from 'express';
import { Episode } from '../../models/episode';

export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { episodeId } = req.params;

  try {
    const episode = await Episode.findById(episodeId).populate('serie');
    const nextEpisode = episode
      ? await Episode.findOne({
          serie: episode.serie,
          order: episode.order + 1,
        })
      : null;
    const prevEpisode = episode
      ? await Episode.findOne({
          serie: episode.serie,
          order: Math.max(episode.order - 1, 0),
        })
      : null;

    res.status(200).json({
      episode,
      nextEpisode,
      prevEpisode,
    });
  } catch (e) {
    next(e);
  }
};
