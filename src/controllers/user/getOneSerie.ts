import { Request, Response, NextFunction } from 'express';
import { UserSeries } from '../../models/userSeries';

export const getOneSerie = async (req: Request, res: Response, next: NextFunction) => {
  const { serieId, userId } = req.params;

  try {
    const serie = await UserSeries.findOne({ serie: serieId, userId })
    res.status(200).json(serie);
  } catch(reason) {
    next(reason);
  }
};