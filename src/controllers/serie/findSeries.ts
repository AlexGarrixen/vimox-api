import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { Serie } from '../../models';

const defaultPageIdx = '1';
const defaultLimit = '20';

interface Querys {
  page_index?: string;
  limit_items?: string;
  title?: string;
  sort_createdAt?: 'asc' | 'desc';
  type?: string;
  gener?: string;
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
    gener,
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

  let filterCount = {};

  if (title)
    pipeline.unshift({
      $match: {
        titles: {
          $in: [new RegExp(title, 'gi')],
        },
      },
    });

  if (gener) {
    pipeline.unshift({
      $match: {
        geners: {
          $in: [Types.ObjectId(gener)],
        },
      },
    });

    filterCount = {
      ...filterCount,
      geners: {
        $in: [Types.ObjectId(gener)],
      },
    };
  }

  if (sort_createdAt)
    pipeline.push({
      $sort: { createdAt: sort_createdAt === 'desc' ? -1 : 1 },
    });

  if (type) {
    pipeline.push({
      $match: {
        type,
      },
    });

    filterCount = {
      ...filterCount,
      type,
    };
  }

  try {
    const count = await Serie.find(filterCount).countDocuments();
    const series = await Serie.aggregate(pipeline).skip(skip).limit(limit);
    const lastPage = Math.ceil(count / limit);

    res.status(200).json({ series, count, lastPage });
  } catch (e) {
    next(e);
  }
};
