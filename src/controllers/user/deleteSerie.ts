import { Request, Response, NextFunction } from 'express';
import { UserSeries } from '../../models/userSeries';
import { Serie } from '../../models/serie';

export const deleteSerie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { serieId, userId } = req.params;

  try {
    const deletedDoc = await UserSeries.findOneAndDelete({
      serie: serieId,
      userId,
    });

    if (deletedDoc) {
      await Serie.findByIdAndUpdate(deletedDoc.serie, {
        $pull: {
          addedByUsers: {
            user: deletedDoc.userId.toString(),
          },
        },
      });
    }

    res.status(200).json({
      message: 'deleted serie',
    });
  } catch (e) {
    next(e);
  }
};
