import { Request, Response, NextFunction } from 'express';
import qs from 'query-string';
import { Episode } from '../../models';

const defaultPageIdx = '1';
const defaultLimit = '20';

export const findEpisodes = async (
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
    const episodes = await Episode.find()
      .limit(limit)
      .skip(skip)
      .sort(sort)
      .populate('serie', 'name');
    const episodesCount = await Episode.countDocuments();
    const lastPage = Math.ceil(episodesCount / limit);

    res.status(200).json({ episodes, count: episodesCount, lastPage });
  } catch (e) {
    next(e);
  }
};
