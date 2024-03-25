import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { User } from 'src/common/entities/user';
import { PrismaRepository } from 'src/modules/prisma/data/prisma.repository';

@Injectable()
export class UsersRepository {
  constructor(private prismaRepository: PrismaRepository) {}

  getAllUsers(): Promise<User[]> {
    return this.prismaRepository.user.findMany();
  }

  getUserById(id: string): Promise<User | null> {
    return this.prismaRepository.user.findUnique({
      where: { id },
    });
  }

  async addUser(user: { login: string; password: string }): Promise<User> {
    const newUser = await this.prismaRepository.user.create({
      data: {
        id: uuidv4(),
        login: user.login,
        password: user.password,
        version: 1,
      },
    });

    return newUser;
  }

  updateUser(id: string, changes: { password: string }): Promise<User | null> {
    return this.prismaRepository.user.update({
      where: { id },
      data: changes,
    });
  }

  async deleteUser(id: string): Promise<void> {
    await this.prismaRepository.user.delete({
      where: { id },
    });
  }
}
