import { ApiProperty } from '@nestjs/swagger';
import { AlbumResponse } from 'src/modules/album/presenter/responses/album.response';
import { ArtistResponse } from 'src/modules/artists/presenter/responses/artist.response';
import { TrackResponse } from 'src/modules/tracks/presenter/responses/track.response';

export class FavoriteResponse {
  @ApiProperty({
    description: 'Favorite artists',
  })
  artists: ArtistResponse[];

  @ApiProperty({
    description: 'Favorite albums',
  })
  albums: AlbumResponse[];

  @ApiProperty({
    description: 'Favorite tracks',
  })
  tracks: TrackResponse[];
}
