import { ApiProperty } from '@nestjs/swagger';

export class AlbumResponse {
  @ApiProperty({
    description: 'Id of the album',
    example: '6839c0fe-ea36-4f17-87af-8509cef7ace1',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the album',
    example: 'Name',
  })
  name: string;

  @ApiProperty({
    description: 'Year of the album',
    example: 2020,
  })
  year: number;

  @ApiProperty({
    description: 'Id of the artist',
    example: '6839c0fe-ea36-4f17-87af-8509cef7ace1',
  })
  artistId: string | null;
}
