import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsUUID, IsOptional } from 'class-validator';

export class ChangeTrackBody {
  @ApiProperty({
    description: 'Track name',
    example: 'New track',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Track duration',
    example: 123,
    required: true,
  })
  @IsNumber()
  duration: number;

  @ApiProperty({
    description: 'Album ID',
    example: '6839c0fe-ea36-4f17-87af-8509cef7ace1',
    required: true,
  })
  @IsOptional()
  @IsUUID()
  albumId: string;

  @ApiProperty({
    description: 'Artist ID',
    example: '6839c0fe-ea36-4f17-87af-8509cef7ace1',
    required: true,
  })
  @IsOptional()
  @IsUUID()
  artistId: string;
}
