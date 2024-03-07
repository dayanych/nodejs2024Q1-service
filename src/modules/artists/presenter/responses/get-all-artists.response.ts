import { ApiProperty } from '@nestjs/swagger';
import { ArtistResponse } from './artist.response';

export class GetAllArtistsResponse {
  @ApiProperty()
  artists: ArtistResponse[];
}
