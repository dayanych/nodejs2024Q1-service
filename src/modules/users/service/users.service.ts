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

  getAllUsers(): Promise<User[]> {
    return this.usersRepository.getAllUsers();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.usersRepository.getUserById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  addUser(user: { login: string; password: string }): Promise<User> {
    return this.usersRepository.addUser(user);
  }

  async updateUser(
    id: string,
    changes: { oldPassword: string; newPassword: string },
  ): Promise<User> {
    const user = await this.usersRepository.getUserById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (user.password !== changes.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }

    const updatedUser = this.usersRepository.updateUser(id, {
      password: changes.newPassword,
      version: user.version + 1,
    });

    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.usersRepository.getUserById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await this.usersRepository.deleteUser(id);
  }
}
