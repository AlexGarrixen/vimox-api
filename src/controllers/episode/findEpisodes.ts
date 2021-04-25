import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { Episode } from '../../models/episode';
import { getNextPage, getPrevPage } from '../../utils/pagination';

interface EpisodeQuerys {
  sort_createdAt?: 'asc' | 'desc';
  limit_items?: string;
  of_serieId?: string;
  page_index?: string;
}

const defaultPageIdx = '1';
const defaultLimit = '20';

export const findEpisodes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    sort_createdAt,
    limit_items,
    of_serieId,
    page_index,
  }: EpisodeQuerys = req.query;

  const sort: Record<string, any> = {};
  const limit = parseInt(limit_items || defaultLimit);
  const pageIndex = parseInt(page_index || defaultPageIdx);
  const skip = limit * (pageIndex - 1);
  let filter = {};

  if (sort_createdAt) sort.createdAt = sort_createdAt;

  if (of_serieId)
    filter = {
      ...filter,
      serie: Types.ObjectId(of_serieId),
    };

  try {
    const count = await Episode.find().countDocuments();
    const episodes = await Episode.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('serie');
    const lastPage = Math.ceil(count / limit);
    const nextPage = getNextPage(pageIndex, lastPage);
    const prevPage = getPrevPage(pageIndex, 1);

    res
      .status(200)
      .json({ data: episodes, lastPage, nextPage, prevPage, count });
  } catch (e) {
    next(e);
  }
};
