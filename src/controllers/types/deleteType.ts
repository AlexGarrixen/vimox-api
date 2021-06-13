import { Request, Response, NextFunction } from 'express';
import { TypeModel } from '../../models/type';

export const deleteType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { typeId } = req.params;

  try {
    const response = await TypeModel.findByIdAndDelete(typeId);
    res.status(200).json(response);
  } catch (reason) {
    next(reason);
  }
};
