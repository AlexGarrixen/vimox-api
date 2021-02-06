import { Request, Response, NextFunction } from 'express';
import { Serie } from '../../models';

export const createSerie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const serieDoc = new Serie({ ...req.body });
    await serieDoc.save();

    serieDoc.getChanges();
    res.status(201).json(serieDoc);
  } catch (e) {
    next(e);
  }
};
