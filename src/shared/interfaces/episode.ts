import { Episode } from 'src/models';

export interface Episode {
  serie: string;
  name: string;
  sinopsis: string;
  src: string;
  thumbnail: string;
  previewImage: string;
  order: number;
  createdAt: string;
}
