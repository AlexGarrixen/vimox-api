import { Request, Response, NextFunction } from 'express';
import Boom from '@hapi/boom';
import { UserSeries } from '../../models/userSeries';
import { Episode } from '../../models/episode';

export const updateLastEpisodeWatched = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { serieId, userId } = req.params;
  const { lastEpisodeWatched } = req.body;

  try {
    const episode = await Episode.findOne({
      serie: serieId,
      _id: lastEpisodeWatched,
    }).lean();

    if (episode) {
      const serieUpdated = await UserSeries.findOneAndUpdate(
        { serie: serieId, userId },
        {
          lastEpisodeWatched,
        },
        {
          new: true,
        }
      )
        .populate('serie')
        .lean();

      res.status(200).json({ ...serieUpdated, lastEpisodeWatched: episode });
    } else {
      res.status(404).json(Boom.notFound('Episode not found'));
    }
  } catch (e) {
    next(e);
  }
};
