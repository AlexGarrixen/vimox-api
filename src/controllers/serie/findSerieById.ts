import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { Serie } from '../../models/serie';
import { UserSeries } from '../../models/userSeries';
import { retrieveBearerToken } from '../../utils/jwt';

export const findSerieById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { serieId } = req.params;
  const jwt = retrieveBearerToken(req);

  try {
    const [serie] = await Serie.aggregate([
      {
        $match: {
          _id: Types.ObjectId(serieId),
        },
      },
      {
        $lookup: {
          from: 'episodes',
          localField: 'episodes',
          foreignField: '_id',
          as: 'episodes',
        },
      },
      {
        $addFields: {
          duration: {
            $sum: '$episodes.duration',
          },
        },
      },
    ]);

    const isInQueue =
      jwt && serie
        ? await UserSeries.findOne({ serie: serie._id, userId: jwt.userId })
        : false;

    res
      .status(200)
      .json(serie ? { ...serie, isInQueue: Boolean(isInQueue) } : null);
  } catch (e) {
    next(e);
  }
};
