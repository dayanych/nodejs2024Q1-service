import { ApiProperty } from '@nestjs/swagger';
import { AlbumResponse } from './album.response';

export class GetAllAlbumsResponse {
  @ApiProperty()
  albums: AlbumResponse[];
}
