import { Request, Response, NextFunction } from 'express';
import { Serie } from '../../models';

const defaultPageIdx = '1';
const defaultLimit = '20';

interface Querys {
  page_index?: string;
  limit_items?: string;
  title?: string;
  sort_createdAt?: 'asc' | 'desc';
  type?: string;
}

export const findSeries = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    page_index,
    limit_items,
    title,
    sort_createdAt,
    type,
  }: Querys = req.query;

  const pageIndex = parseInt(page_index || defaultPageIdx);
  const limit = parseInt(limit_items || defaultLimit);
  const skip = limit * (pageIndex - 1);

  const pipeline: Record<string, any>[] = [
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

  if (title)
    pipeline.unshift({
      $match: {
        titles: {
          $in: [new RegExp(title, 'gi')],
        },
      },
    });

  if (sort_createdAt)
    pipeline.push({
      $sort: { createdAt: sort_createdAt === 'desc' ? -1 : 1 },
    });

  if (type)
    pipeline.push({
      $match: {
        type,
      },
    });

  try {
    const seriesCount = await Serie.countDocuments();
    const lastPage = Math.ceil(seriesCount / limit);
    const series = await Serie.aggregate(pipeline).skip(skip).limit(limit);

    res.status(200).json({ series, count: seriesCount, lastPage });
  } catch (e) {
    next(e);
  }
};
