import { Request, Response, NextFunction } from 'express';
import { Serie } from '../../models/serie';
import { UserSeries } from '../../models/userSeries';
import { getNextPage, getPrevPage } from '../../utils/pagination';
import { retrieveBearerToken } from '../../utils/jwt';
interface Querys {
  page_index?: string;
  limit_items?: string;
  sort_createdAt?: string;
  sort_release?: string;
  release?: string;
  type?: string;
  gener?: string;
  name?: string;
  title?: string;
}

const makeFilter = ({
  type,
  gener,
  release = '',
  name,
  title,
}: Pick<Querys, 'type' | 'gener' | 'release' | 'name' | 'title'>) => {
  const filter: Record<string, unknown> = {};
  const releaseTypes = ['today', 'last_premieres'];

  if (type) filter.type = type;
  if (gener) filter.geners = { $in: [gener] };
  if (title) filter.titles = { $in: [new RegExp(title, 'gi')] };
  if (name) filter.name = { $regex: new RegExp(name, 'gi') };
  if (releaseTypes.includes(release)) {
    switch (release) {
      case 'last_premieres':
        filter.release = { $lte: new Date().toISOString() };
        break;
      case 'today':
        const start = new Date();
        const end = new Date();
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        filter.release = { $gte: start, $lt: end };
        break;
    }
  }

  return filter;
};

const makeSort = ({
  sort_createdAt = '',
  sort_release = '',
}: Pick<Querys, 'sort_createdAt' | 'sort_release'>) => {
  const sortTypes = ['asc', 'desc'];
  const sort: Record<string, unknown> = {};

  if (sortTypes.includes(sort_createdAt)) sort.createdAt = sort_createdAt;
  if (sortTypes.includes(sort_release)) sort.release = sort_release;

  return sort;
};

const defaultPageIdx = '1';
const defaultLimit = '20';

export const findSeries = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    page_index,
    limit_items,
    sort_createdAt,
    sort_release,
    type,
    gener,
    release,
    name,
    title,
  }: Querys = req.query;

  const jwt = retrieveBearerToken(req);
  const pageIndex = parseInt(page_index || defaultPageIdx);
  const limit = parseInt(limit_items || defaultLimit);
  const skip = limit * (pageIndex - 1);
  const filter = makeFilter({ type, gener, release, name, title });
  const sort = makeSort({ sort_createdAt, sort_release });

  try {
    const count = await Serie.find(filter).countDocuments();
    const lastPage = Math.ceil(count / limit);
    const nextPage = getNextPage(pageIndex, lastPage);
    const prevPage = getPrevPage(pageIndex, 1);
    const response = await Serie.find(filter)
      .populate('episodes')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();
    const series = jwt
      ? await Promise.all(
          response.map(async (serie) => {
            const doc = await UserSeries.findOne({
              serie: serie._id,
              userId: jwt.userId,
            });
            return {
              ...serie,
              isInQueue: Boolean(doc),
            };
          })
        )
      : response.map((doc) => ({ ...doc, isInQueue: false }));

    res.status(200).json({ series, count, lastPage, nextPage, prevPage });
  } catch (e) {
    next(e);
  }
};
