import { Request, Response, NextFunction } from 'express';
import { UserSeries } from '../../models/userSeries';

export const deleteSerie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { serieId } = req.params;

  try {
    await UserSeries.findByIdAndDelete(serieId);

    res.status(200).json({
      message: 'deleted serie',
    });
  } catch (e) {
    next(e);
  }
};
