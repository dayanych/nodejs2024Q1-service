import { ApiProperty } from '@nestjs/swagger';

export class ArtistResponse {
  @ApiProperty({
    description: 'The id of the artist',
    example: '6839c0fe-ea36-4f17-87af-8509cef7ace1',
  })
  id: string;

  @ApiProperty({
    description: 'The login of the name',
    example: 'John',
  })
  name: string;

  @ApiProperty({
    description: 'The grammy of the artist',
    example: true,
  })
  grammy: boolean;
}
