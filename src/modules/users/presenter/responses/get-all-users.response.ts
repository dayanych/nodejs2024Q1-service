import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from './user.response';

export class GetAllUsersResponse {
  @ApiProperty()
  users: UserResponse;
}
