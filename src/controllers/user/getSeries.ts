import { Request, Response, NextFunction } from 'express';
import { UserSeries } from '../../models/userSeries';

export const getSeries = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;

  try {
    const library = await UserSeries.find({ userId }).populate({
      path: 'serie',
      populate: { path: 'episodes' },
    });

    res.status(201).json({
      library,
    });
  } catch (e) {
    next(e);
  }
};
