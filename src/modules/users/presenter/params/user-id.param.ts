import { IsUUID } from 'class-validator';

export class UserIdParam {
  @IsUUID()
  user_id: string;
}
