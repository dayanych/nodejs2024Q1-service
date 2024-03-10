import { Module } from '@nestjs/common';
import { UsersController } from './presenter/users.controller';
import { UsersService } from './service/users.service';
import { UsersRepository } from './data/users.repository';
import { UserResource } from './presenter/resources/user.resource';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, UserResource],
})
export class UsersModule {}
