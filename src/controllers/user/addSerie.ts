import { Request, Response, NextFunction } from 'express';
import { UserSeries } from '../../models/userSeries';

export const addSerie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  const { serieId } = req.body;

  try {
    const SerieDoc = new UserSeries({ userId, serie: serieId });
    const addedSerie = await SerieDoc.save();

    res.status(200).json(addedSerie);
  } catch (e) {
    next(e);
  }
};
