import { Request, Response, NextFunction } from 'express';
import { Serie } from '../../models/serie';
import { UserSeries } from '../../models/userSeries';
import { getNextPage, getPrevPage } from '../../utils/pagination';
import { retrieveBearerToken } from '../../utils/jwt';

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

  const jwt = retrieveBearerToken(req);
  const pageIndex = parseInt(page_index || defaultPageIdx);
  const limit = parseInt(limit_items || defaultLimit);
  const skip = limit * (pageIndex - 1);

  const filterQuerys: Record<string, string> = {};
  const sortQuerys: Record<string, string> = {};

  if (title) filterQuerys.title = title;
  if (type) filterQuerys.type = type;
  if (gener) filterQuerys.gener = gener;
  if (sort_createdAt) sortQuerys.createdAt = sort_createdAt;

  try {
    const count = await Serie.find(filterQuerys).countDocuments();
    const data = await Serie.find(filterQuerys)
      .populate('geners')
      .sort(sortQuerys)
      .skip(skip)
      .limit(limit)
      .lean();
    const lastPage = Math.ceil(count / limit);
    const nextPage = getNextPage(pageIndex, lastPage);
    const prevPage = getPrevPage(pageIndex, 1);
    const series = jwt
      ? await Promise.all(
          data.map(async (doc) => {
            const serie = await UserSeries.findOne({
              serie: doc._id,
              userId: jwt.userId,
            });
            return {
              ...doc,
              isInQueue: Boolean(serie),
            };
          })
        )
      : data.map((doc) => ({ ...doc, isInQueue: false }));

    res.status(200).json({ series, count, lastPage, nextPage, prevPage });
  } catch (e) {
    next(e);
  }
};
