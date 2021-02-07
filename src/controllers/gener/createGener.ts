import { Request, Response, NextFunction } from 'express';
import { Gener } from '../../models';

export const createGener = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const generDoc = new Gener(req.body);

    await generDoc.save();
    generDoc.getChanges();

    res.status(201).json(generDoc);
  } catch (e) {
    next(e);
  }
};
