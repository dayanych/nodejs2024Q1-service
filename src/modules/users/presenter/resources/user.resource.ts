import { User, UserWithoutPassword } from 'src/common/entities/user';

export class UserResource {
  convert(payload: User): UserWithoutPassword {
    return {
      id: payload.id,
      login: payload.login,
      version: payload.version,
      createdAt: payload.createdAt.getTime(),
      updatedAt: payload.updatedAt.getTime(),
    };
  }
}
