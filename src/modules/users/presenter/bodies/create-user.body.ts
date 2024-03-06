import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserBody {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
