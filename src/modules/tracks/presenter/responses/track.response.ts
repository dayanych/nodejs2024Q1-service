import { ApiProperty } from '@nestjs/swagger';

export class TrackResponse {
  @ApiProperty({
    description: 'Id of the track',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Name of the track',
    example: 'Name',
  })
  name: string;

  @ApiProperty({
    description: 'Duration of the track',
    example: 122,
  })
  duration: number;

  @ApiProperty({
    description: 'Artist of the track',
    example: '6839c0fe-ea36-4f17-87af-8509cef7ace1',
  })
  artistId: string;

  @ApiProperty({
    description: 'Album of the track',
    example: '6839c0fe-ea36-4f17-87af-8509cef7ace1',
  })
  albumId: string;
}
