import { Request, Response, NextFunction } from 'express';
import { Serie } from '../../models/serie';
import { Types } from 'mongoose';

export const findSerieById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { serieId } = req.params;

  const pipeline: Record<string, any>[] = [
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
      $lookup: {
        from: 'geners',
        localField: 'geners',
        foreignField: '_id',
        as: 'geners',
      },
    },
    {
      $addFields: {
        totalDuration: {
          $sum: '$episodes.duration',
        },
      },
    },
  ];

  try {
    const serie = await Serie.aggregate(pipeline);

    res.status(200).json(serie !== null ? serie : {});
  } catch (e) {
    next(e);
  }
};
