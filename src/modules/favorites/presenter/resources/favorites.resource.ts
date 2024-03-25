import { Favorites } from 'src/common/entities/favorites';

export class FavoriteResource {
  convert(payload: Favorites) {
    return {
      artists: payload.artists,
      albums: payload.albums,
      tracks: payload.tracks,
    };
  }
}
