import { Request, Response, NextFunction } from 'express';
import { Serie } from '../../models/serie';

export const deleteSerie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { serieId } = req.params;

  try {
    const serie = await Serie.findById(serieId);

    if (serie === null) res.status(404).json({ message: 'Serie no found' });

    await Serie.deleteOne({ _id: serieId });

    res.status(200).json({
      deletedSerieId: serieId,
    });
  } catch (e) {
    next(e);
  }
};
