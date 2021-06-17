import { Request, Response, NextFunction } from 'express';
import { Serie } from '../../models/serie';

export const findSerie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title } = req.query;
  const filterQuerys: Record<string, unknown> = {};

  if (title) filterQuerys.titles = { $in: [new RegExp(title as string, 'gi')] };

  try {
    const results = await Serie.find(filterQuerys).populate('episodes');
    res.status(200).json(results);
  } catch (reason) {
    next(reason);
  }
};
