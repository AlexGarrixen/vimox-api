import { Request, Response, NextFunction } from 'express';
import { Gener } from '../../models';

export const findGenerById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { generId } = req.params;

    const gener = await Gener.findById(generId);

    res.status(200).json(gener);
  } catch (e) {
    next(e);
  }
};
