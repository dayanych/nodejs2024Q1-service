import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { User } from 'src/common/entities/user';

@Injectable()
export class UsersRepository {
  private users: User[] = [];

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: string): User | null {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  addUser(user: { login: string; password: string }): User {
    const newUser = {
      id: uuidv4(),
      login: user.login,
      password: user.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);

    return newUser;
  }

  updateUser(id: string, changes: { password: string }): User {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...changes,
          version: user.version + 1,
          updatedAt: Date.now(),
        };
      }
      return user;
    });

    const updatedUser = this.users.find((user) => user.id === id);

    return updatedUser;
  }

  deleteUser(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
