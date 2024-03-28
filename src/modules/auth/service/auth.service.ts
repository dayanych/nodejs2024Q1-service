import { compare } from 'bcrypt';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/service/users.service';
import { UserAccessTokensRepository } from '../data/user-access-tokens.repository';
import { UserRefreshTokensRepository } from '../data/user-refresh-tokens.repository';
import { getAuthConfig } from 'src/config/auth.config';
import { User } from 'src/common/entities/user';
import { UserAccessToken } from 'src/common/entities/user-access-token';

@Injectable()
export class AuthService {
  authConfig = getAuthConfig();
  constructor(
    private jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly userAccessTokensRepository: UserAccessTokensRepository,
    private readonly userRefreshTokensRepository: UserRefreshTokensRepository,
  ) {}

  async authenticateUser({
    login,
    password,
  }: {
    login: string;
    password: string;
  }): Promise<UserAccessToken> {
    const user = await this.verifyPassword({ login, password });

    await this.userAccessTokensRepository.deleteByUserId(user.id);

    const authPayload = await this.createAndGetAccessToken(user.id);

    return authPayload;
  }

  async verifyPassword({
    login,
    password,
  }: {
    login: string;
    password: string;
  }): Promise<User> {
    const user = await this.userService.getUserByLogin(login);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      throw new ForbiddenException();
    }

    return user;
  }

  async createAndGetAccessToken(userId: string) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);

    const accessTokenExpiresAt = this.getExpireTime(
      this.authConfig.access.expiresIn,
    );
    const refreshTokenExpiresAt = this.getExpireTime(
      this.authConfig.refresh.expiresIn,
    );

    await this.userAccessTokensRepository.createAndGet({
      userId,
      token: accessToken,
      expiresAt: accessTokenExpiresAt.toISOString(),
    });

    await this.userRefreshTokensRepository.createAndGet({
      userId,
      token: refreshToken,
      expiresAt: refreshTokenExpiresAt.toISOString(),
    });

    return {
      access: {
        token: accessToken,
        expiresAt: accessTokenExpiresAt,
      },
      refresh: {
        token: refreshToken,
        expiresAt: refreshTokenExpiresAt,
      },
    };
  }

  async generateTokens(userId: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
        },
        {
          secret: this.authConfig.access.secret,
          expiresIn: this.authConfig.access.expiresIn,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
        },
        {
          secret: this.authConfig.refresh.secret,
          expiresIn: this.authConfig.refresh.expiresIn,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  getExpireTime(stringHours: string): Date {
    const [value, unit] = stringHours.match(/\d+|\D+/g);

    const hours = parseInt(value);

    if (unit.toLowerCase() === 'h') {
      const currentDate = new Date();
      currentDate.setHours(currentDate.getHours() + hours);

      return currentDate;
    } else {
      throw new BadRequestException('Invalid time unit provided');
    }
  }
}
