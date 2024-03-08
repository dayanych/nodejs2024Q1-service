import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class ChangeAlbumBody {
  @ApiProperty({
    description: 'Album name',
    example: 'New album',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Album year',
    example: 2020,
  })
  @IsNumber()
  year: number;

  @ApiProperty({
    description: 'Album artist id',
    example: '6839c0fe-ea36-4f17-87af-8509cef7ace1',
  })
  @IsOptional()
  @IsUUID()
  artistId: string;
}
