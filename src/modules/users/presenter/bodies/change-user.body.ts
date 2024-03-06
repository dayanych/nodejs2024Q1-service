import { IsString } from 'class-validator';

export class ChangeUserBody {
  @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;
}
