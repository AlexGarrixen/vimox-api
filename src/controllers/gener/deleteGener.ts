import { Request, Response, NextFunction } from 'express';
import { Gener } from '../../models';

export const deleteGener = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { generId } = req.params;
  try {
    const serie = await Gener.findById(generId);

    if (serie === null)
      return res.status(404).json({ message: 'Not found gener' });

    await Gener.deleteOne({ _id: generId });
    res.status(200).json({ deletedGener: generId });
  } catch (e) {
    next(e);
  }
};
