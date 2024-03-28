import { Artist } from 'src/common/entities/artist';
import { ArtistResponse } from '../responses/artist.response';

export class ArtistResource {
  convert(artist: Artist): ArtistResponse {
    return {
      id: artist.id,
      name: artist.name,
      grammy: artist.grammy,
    };
  }
}
