import { Request, Response, NextFunction } from 'express';
import { Document } from 'mongoose';
import { Episode, Serie } from '../../models';
import { Episode as IEpisode } from '../../shared/interfaces';

type Ep = IEpisode & Document;

export const createEpisode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const episodeDoc = new Episode(req.body) as Ep;

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
