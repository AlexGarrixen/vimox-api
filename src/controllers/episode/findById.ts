import { Request, Response, NextFunction } from 'express';
import { Episode } from '../../models';

export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { episodeId } = req.params;

  try {
    const episode = await Episode.findById(episodeId).populate('serie');

    res.status(200).json(episode);
  } catch (e) {
    next(e);
  }
};
