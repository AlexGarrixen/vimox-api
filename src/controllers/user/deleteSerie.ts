import { Request, Response, NextFunction } from 'express';
import { UserSeries } from '../../models/userSeries';

export const deleteSerie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { serieId, userId } = req.params;

  try {
    await UserSeries.findOneAndDelete({
      serie: serieId,
      userId,
    });

    res.status(200).json({
      message: 'deleted serie',
    });
  } catch (e) {
    next(e);
  }
};
