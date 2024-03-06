import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { UsersService } from '../service/users.service';
import { UserResource } from './resources/user.resource';
import { UserWithoutPassword } from 'src/common/entities/user';
import { UserIdParam } from './params/user-id.param';
import { CreateUserBody } from './bodies/create-user.body';
import { ChangeUserBody } from './bodies/change-user.body';

@Controller('/user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userResource: UserResource,
  ) {}

  @Get()
  getAllUsers(): UserWithoutPassword[] {
    const users = this.usersService.getAllUsers();

    return users.map((user) => this.userResource.convert(user));
  }

  @Get(':user_id')
  getUserById(@Param() param: UserIdParam): UserWithoutPassword {
    const user = this.usersService.getUserById(param.user_id);

    return this.userResource.convert(user);
  }

  @Post()
  @HttpCode(StatusCodes.CREATED)
  addUser(@Body() body: CreateUserBody): UserWithoutPassword {
    const user = this.usersService.addUser(body);

    return this.userResource.convert(user);
  }

  @Put(':user_id')
  updateUser(
    @Param() param: UserIdParam,
    @Body() body: ChangeUserBody,
  ): UserWithoutPassword {
    const user = this.usersService.updateUser(param.user_id, body);

    return this.userResource.convert(user);
  }

  @Delete(':user_id')
  @HttpCode(StatusCodes.NO_CONTENT)
  deleteUser(@Param() param: UserIdParam): void {
    this.usersService.deleteUser(param.user_id);
  }
}
