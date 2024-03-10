import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from '../data/users.repository';
import { User } from 'src/common/entities/user';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  getAllUsers(): User[] {
    return this.usersRepository.getAllUsers();
  }

  getUserById(id: string): User {
    const user = this.usersRepository.getUserById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  addUser(user: { login: string; password: string }): User {
    return this.usersRepository.addUser(user);
  }

  updateUser(
    id: string,
    changes: { oldPassword: string; newPassword: string },
  ): User {
    const user = this.usersRepository.getUserById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (user.password !== changes.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }

    const updatedUser = this.usersRepository.updateUser(id, {
      password: changes.newPassword,
    });

    return updatedUser;
  }

  deleteUser(id: string): void {
    const user = this.usersRepository.getUserById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    this.usersRepository.deleteUser(id);
  }
}
