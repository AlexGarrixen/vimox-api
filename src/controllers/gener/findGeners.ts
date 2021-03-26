import { Request, Response, NextFunction } from 'express';
import { Gener } from '../../models/gener';

export const findGeners = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filter: Record<string, unknown> = {};
    const nameQuery = req.query.name as string | undefined;

    if (nameQuery) filter['name'] = { $regex: new RegExp(nameQuery, 'gi') };

    const geners = await Gener.find(filter);

    res.status(200).json(geners);
  } catch (e) {
    next(e);
  }
};
