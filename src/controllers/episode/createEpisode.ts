import { Request, Response, NextFunction } from 'express';
import { Episode } from '../../models/episode';

export const createEpisode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const episodeDoc = new Episode(req.body);

    await episodeDoc.save();
    episodeDoc.getChanges();

    res.status(201).json(episodeDoc);
  } catch (e) {
    next(e);
  }
};
