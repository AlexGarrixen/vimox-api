import { Request, Response, NextFunction } from 'express';
import { Document } from 'mongoose';
import { Episode } from '../../models/episode';
import { Serie } from '../../models/serie';
import { Episode as IEpisode } from '../../types';

type Ep = IEpisode & Document;

interface IndexEpisode {
  _id: string;
  epIndex: number;
}

const getEpisodeIndex = async (serieId: string, episodeId: string) =>
  Serie.aggregate<IndexEpisode>([
    { $match: { _id: serieId } },
    {
      $project: {
        epIndex: { $indexOfArray: ['$episodes', episodeId] },
      },
    },
  ]);

const deleteEpisodeFromSerie = (opts: {
  epIndex: number;
  serieId: string;
  currentEpisodes: string[];
}) => {
  const episodesNews = [...opts.currentEpisodes];
  episodesNews.splice(opts.epIndex, 1);

  return Serie.updateOne({ _id: opts.serieId }, { episodes: episodesNews });
};

export const deleteEpisode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { episodeId } = req.params;

    const episode = (await Episode.findById(episodeId)) as Ep;

    if (episode === null)
      return res.status(404).json({ message: 'Not found episode' });

    await Episode.deleteOne({ _id: episodeId });

    const serie = await Serie.findById(episode.serie);

    if (serie) {
      const [{ epIndex }] = await getEpisodeIndex(serie._id, episode._id);

      await deleteEpisodeFromSerie({
        serieId: serie._id,
        epIndex,
        //@ts-ignore
        currentEpisodes: serie.episodes,
      });
    }

    res.status(200).json({ deletedEpisode: episodeId });
  } catch (e) {
    next(e);
  }
};
