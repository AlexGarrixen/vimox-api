import { Request, Response, NextFunction } from 'express';
import { Serie } from '../../models/serie';

export const findSerie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title } = req.query;
  const filter: Record<string, unknown> = {};

  filter.release = {
    $lte: new Date().toISOString(),
  };

  if (title) {
    filter.titles = {
      $in: [new RegExp(title as string, 'gi')],
    };
  }

  try {
    const results = await Serie.find(filter).populate('episodes');
    res.status(200).json(results);
  } catch (reason) {
    next(reason);
  }
};
