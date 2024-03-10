import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ChangeUserBody {
  @ApiProperty({
    description: 'Old password',
    example: 'password',
    required: true,
  })
  @IsString()
  oldPassword: string;

  @ApiProperty({
    description: 'New password',
    example: 'new_password',
    required: true,
  })
  @IsString()
  newPassword: string;
}
