import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserBody {
  @ApiProperty({
    description: 'Login',
    example: 'John',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({
    description: 'Password',
    example: 'password',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
