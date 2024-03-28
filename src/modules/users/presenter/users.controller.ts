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
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { StatusCodes } from 'http-status-codes';
import { UserWithoutPassword } from 'src/common/entities/user';
import { UsersService } from '../service/users.service';
import { UserResource } from './resources/user.resource';
import { UserIdParam } from './params/user-id.param';
import { CreateUserBody } from './bodies/create-user.body';
import { ChangeUserBody } from './bodies/change-user.body';
import { GetAllUsersResponse } from './responses/get-all-users.response';
import { UserResponse } from './responses/user.response';

@ApiTags('Users')
@Controller('/user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userResource: UserResource,
  ) {}

  @ApiOkResponse({
    description: 'Get all users',
    type: GetAllUsersResponse,
  })
  @Get()
  async getAllUsers(): Promise<UserWithoutPassword[]> {
    const users = await this.usersService.getAllUsers();

    return users.map((user) => this.userResource.convert(user));
  }

  @ApiOkResponse({
    description: 'Get user by id',
    type: UserResponse,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    status: StatusCodes.NOT_FOUND,
  })
  @Get(':user_id')
  async getUserById(@Param() param: UserIdParam): Promise<UserWithoutPassword> {
    const user = await this.usersService.getUserById(param.user_id);

    return this.userResource.convert(user);
  }

  @ApiOkResponse({
    description: 'Create user',
    type: UserResponse,
  })
  @Post()
  @HttpCode(StatusCodes.CREATED)
  async addUser(@Body() body: CreateUserBody): Promise<UserWithoutPassword> {
    const user = await this.usersService.addUser(body);

    return this.userResource.convert(user);
  }

  @ApiOkResponse({
    description: 'Update user',
    type: UserResponse,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    status: StatusCodes.NOT_FOUND,
  })
  @ApiForbiddenResponse({
    description: 'Wrong old password',
    status: StatusCodes.FORBIDDEN,
  })
  @Put(':user_id')
  async updateUser(
    @Param() param: UserIdParam,
    @Body() body: ChangeUserBody,
  ): Promise<UserWithoutPassword> {
    const user = await this.usersService.updateUser(param.user_id, body);

    return this.userResource.convert(user);
  }

  @ApiOkResponse({
    description: 'Delete user',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    status: StatusCodes.NOT_FOUND,
  })
  @Delete(':user_id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteUser(@Param() param: UserIdParam): Promise<void> {
    await this.usersService.deleteUser(param.user_id);
  }
}
