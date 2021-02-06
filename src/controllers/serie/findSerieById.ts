import { Request, Response, NextFunction } from 'express';
import { Serie } from '../../models';

export const findSerieById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { serieId } = req.params;

  try {
    const serie = await Serie.findById(serieId);

    res.status(200).json(serie !== null ? serie : {});
  } catch (e) {
    next(e);
  }
};
