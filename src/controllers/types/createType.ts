import { Request, Response, NextFunction } from 'express';
import { TypeModel } from '../../models/type';

export const createType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const doc = new TypeModel(req.body);
    doc.save();
    doc.getChanges();

    res.status(201).json(doc);
  } catch (reason) {
    next(reason);
  }
};
