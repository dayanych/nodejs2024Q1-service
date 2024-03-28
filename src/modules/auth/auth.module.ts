import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './presenter/auth.controller';
import { AuthService } from './service/auth.service';
import { UserAccessTokensRepository } from './data/user-access-tokens.repository';
import { UserRefreshTokensRepository } from './data/user-refresh-tokens.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [UsersModule, JwtModule.register({}), PrismaModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserAccessTokensRepository,
    UserRefreshTokensRepository,
  ],
})
export class AuthModule {}
