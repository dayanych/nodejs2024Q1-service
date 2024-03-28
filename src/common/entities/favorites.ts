import { Album } from './album';
import { Artist } from './artist';
import { Track } from './track';

export interface Favorites {
  id: string;
  artists: Artist[]; // favorite artists ids
  albums: Album[]; // favorite albums ids
  tracks: Track[]; // favorite tracks ids
}
