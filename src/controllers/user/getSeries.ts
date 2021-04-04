import { Request, Response, NextFunction } from 'express';
import { UserSeries } from '../../models/userSeries';

export const getSeries = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;

  try {
    const series = await UserSeries.find({ userId })
      .populate('serie')
      .populate('lastEpisodeWatched');

    res.status(201).json(series);
  } catch (e) {
    next(e);
  }
};
