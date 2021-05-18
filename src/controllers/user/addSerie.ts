import { Request, Response, NextFunction } from 'express';
import { UserSeries } from '../../models/userSeries';
import { Episode } from '../../models/episode';

export const addSerie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  const { serieId } = req.body;

  try {
    const defaultEpisode = await Episode.findOne({ serie: serieId, order: 1 });
    const userSerieDoc = new UserSeries({
      userId,
      serie: serieId,
      lastEpisodeWatched: defaultEpisode?._id,
    });
    const addedSerie = await userSerieDoc.save();

    res.status(200).json(addedSerie);
  } catch (e) {
    next(e);
  }
};
