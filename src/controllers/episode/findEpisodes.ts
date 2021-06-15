import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { Episode } from '../../models/episode';
import { getNextPage, getPrevPage } from '../../utils/pagination';

interface Querys {
  sort_createdAt?: string;
  sort_release?: string;
  limit_items?: string;
  of_serieId?: string;
  page_index?: string;
  release?: string;
}

const makeFilter = ({
  of_serieId,
  release = '',
}: Pick<Querys, 'of_serieId' | 'release'>) => {
  const filter: Record<string, unknown> = {};
  const releaseTypes = ['today', 'last_premieres'];

  if (of_serieId) filter.serie = Types.ObjectId(of_serieId);
  if (releaseTypes.includes(release)) {
    switch (release) {
      case 'last_premieres':
        filter.release = { $lte: new Date().toISOString() };
        break;
      case 'today': {
        const start = new Date();
        const end = new Date();
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        filter.release = { $gte: start, $lt: end };
        break;
      }
    }
  }

  return filter;
};

const makeSort = ({
  sort_createdAt = '',
  sort_release = '',
}: Pick<Querys, 'sort_createdAt' | 'sort_release'>) => {
  const sort: Record<string, unknown> = {};
  const sortTypes = ['asc', 'desc'];

  if (sortTypes.includes(sort_createdAt)) sort.createtAt = sort_createdAt;
  if (sortTypes.includes(sort_release)) sort.release = sort_release;

  return sort;
};

const defaultPageIdx = '1';
const defaultLimit = '20';

export const findEpisodes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    sort_createdAt,
    sort_release,
    limit_items,
    of_serieId,
    page_index,
    release,
  }: Querys = req.query;

  const limit = parseInt(limit_items || defaultLimit);
  const pageIndex = parseInt(page_index || defaultPageIdx);
  const skip = limit * (pageIndex - 1);
  const filter = makeFilter({ of_serieId, release });
  const sort = makeSort({ sort_release, sort_createdAt });

  try {
    const count = await Episode.find().countDocuments();
    const lastPage = Math.ceil(count / limit);
    const nextPage = getNextPage(pageIndex, lastPage);
    const prevPage = getPrevPage(pageIndex, 1);
    const episodes = await Episode.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('serie');

    res
      .status(200)
      .json({ data: episodes, lastPage, nextPage, prevPage, count });
  } catch (e) {
    next(e);
  }
};
