import { Request, Response, NextFunction } from 'express';
import { UserSeries } from '../../models/userSeries';

export const updateLastEpisodeWatched = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { serieId, userId } = req.params;
  const { lastEpisodeWatched } = req.body;

  try {
    await UserSeries.findOneAndUpdate(
      { serie: serieId, userId },
      {
        lastEpisodeWatched,
      }
    );

    res.status(200).json({ message: 'episode saved' });
  } catch (e) {
    next(e);
  }
};
