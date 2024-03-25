import { Album } from 'src/common/entities/album';
import { AlbumResponse } from '../responses/album.response';

export class AlbumResource {
  convert(album: Album): AlbumResponse {
    return {
      id: album.id,
      name: album.name,
      year: album.year,
      artistId: album.artistId,
    };
  }
}
