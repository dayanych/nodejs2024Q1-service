import { Injectable } from '@nestjs/common';
import { PrismaRepository } from 'src/modules/prisma/data/prisma.repository';

@Injectable()
export class UserRefreshTokensRepository {
  constructor(private readonly prisma: PrismaRepository) {}

  createAndGet({
    userId,
    token,
    expiresAt,
  }: {
    userId: string;
    token: string;
    expiresAt: string;
  }) {
    return this.prisma.userAccessToken.create({
      data: {
        userId,
        token,
        expiresAt,
      },
    });
  }

  getOneByToken(token: string) {
    return this.prisma.userAccessToken.findFirst({
      where: {
        token,
      },
    });
  }

  deleteByUserId(userId: string) {
    return this.prisma.userAccessToken.deleteMany({
      where: {
        userId,
      },
    });
  }
}
