import { Request, Response, NextFunction } from 'express';
import { Episode } from '../../models/episode';

export const deleteEpisode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { episodeId } = req.params;

    const episode = await Episode.findById(episodeId);

    if (episode === null)
      return res.status(404).json({ message: 'Not found episode' });

    await Episode.deleteOne({ _id: episodeId });

    res.status(200).json({ deletedEpisode: episodeId });
  } catch (e) {
    next(e);
  }
};
