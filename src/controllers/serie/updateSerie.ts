import { Request, Response, NextFunction } from 'express';
import { Serie } from '../../models';

export const updateSerie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { serieId } = req.params;

  try {
    const serie = await Serie.findById(serieId);

    if (serie === null)
      return res.status(404).json({ message: 'Not found serie' });

    await Serie.updateOne({ _id: serieId }, { ...req.body });
    const updatedSerie = await Serie.findById(serieId);

    res.status(200).json(updatedSerie);
  } catch (e) {
    next(e);
  }
};
