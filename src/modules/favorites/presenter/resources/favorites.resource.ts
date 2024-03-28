import { Favorites } from 'src/common/entities/favorites';
import { AlbumResource } from 'src/modules/album/presenter/resources/album.resource';
import { ArtistResource } from 'src/modules/artists/presenter/resources/artist.resource';
import { TrackResource } from 'src/modules/tracks/presenter/resources/track.resource';
import { FavoriteResponse } from '../responses/favorite.response';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoritesResource {
  constructor(
    private readonly artistResource: ArtistResource,
    private readonly albumResource: AlbumResource,
    private readonly trackResource: TrackResource,
  ) {}
  convert(payload: Favorites): FavoriteResponse {
    return {
      artists:
        payload.artists?.map((artist) => this.artistResource.convert(artist)) ||
        [],
      albums:
        payload.albums?.map((album) => this.albumResource.convert(album)) || [],
      tracks:
        payload.tracks?.map((track) => this.trackResource.convert(track)) || [],
    };
  }
}
