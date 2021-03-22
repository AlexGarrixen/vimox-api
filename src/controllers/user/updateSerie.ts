import { Request, Response, NextFunction } from 'express';
import { UserSeries } from '../../models/userSeries';

export const updateSerie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { serieId } = req.params;
  const { lastEpisodeWatched } = req.body;
  const updateQuery: Record<string, any> = {};

  if (lastEpisodeWatched) updateQuery.lastEpisodeWatched = lastEpisodeWatched;

  try {
    const serie = await UserSeries.findByIdAndUpdate(serieId, updateQuery, {
      new: true,
    });

    res.status(200).json(serie);
  } catch (e) {
    next(e);
  }
};
