import { Request, Response, NextFunction } from 'express';
import qs from 'query-string';
import { Serie } from '../../models';

const defaultPageIdx = '1';
const defaultLimit = '20';

export const findSeries = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sortQuery = req.query.sort as string | undefined;
  const pageIndexQuery = req.query.pageIndex as string | undefined;
  const pageLimitQuery = req.query.limit as string | undefined;

  const pageIndex = parseInt(pageIndexQuery || defaultPageIdx);
  const limit = parseInt(pageLimitQuery || defaultLimit);
  const sort = qs.parse(sortQuery || '');
  const skip = limit * (pageIndex - 1);

  try {
    const series = await Serie.find().limit(limit).skip(skip).sort(sort);
    const seriesCount = await Serie.countDocuments();
    const lastPage = Math.ceil(seriesCount / limit);

    res.status(200).json({ series, count: seriesCount, lastPage });
  } catch (e) {
    next(e);
  }
};
