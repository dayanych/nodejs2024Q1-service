import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class AlbumIdParam {
  @ApiProperty({
    description: 'Album ID',
    example: '6839c0fe-ea36-4f17-87af-8509cef7ace1',
  })
  @IsUUID()
  album_id: string;
}
