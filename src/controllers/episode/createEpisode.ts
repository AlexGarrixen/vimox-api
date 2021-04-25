import { Request, Response, NextFunction } from 'express';
import { Episode } from '../../models/episode';
import { Serie } from '../../models/serie';

export const createEpisode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const episodeDoc = new Episode(req.body);

    await episodeDoc.save();
    episodeDoc.getChanges();

    await Serie.updateOne(
      { _id: episodeDoc.serie },
      { $push: { episodes: episodeDoc._id } }
    );

    res.status(201).json(episodeDoc);
  } catch (e) {
    next(e);
  }
};
