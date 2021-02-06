import { Request, Response, NextFunction } from 'express';
import { Episode } from '../../models';

export const updateEpisode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { episodeId } = req.params;

  try {
    const episode = await Episode.findById(episodeId);

    if (episode === null)
      return res.status(404).json({ message: 'Not found episode' });

    await Episode.updateOne({ _id: episodeId }, req.body);
    const updatedSerie = await Episode.findById(episodeId);

    res.status(200).json(updatedSerie);
  } catch (e) {
    next(e);
  }
};
