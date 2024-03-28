import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistBody {
  @ApiProperty({
    description: 'Artist`s name',
    example: 'Jonny',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Artist`s grammy status',
    example: true,
    required: true,
  })
  @IsBoolean()
  grammy: boolean;
}
