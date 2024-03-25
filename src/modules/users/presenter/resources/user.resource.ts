import { User } from 'src/common/entities/user';
import { UserResponse } from '../responses/user.response';

export class UserResource {
  convert(payload: User): UserResponse {
    return {
      id: payload.id,
      login: payload.login,
      version: payload.version,
      createdAt: payload.createdAt.getTime(),
      updatedAt: payload.updatedAt.getTime(),
    };
  }
}
