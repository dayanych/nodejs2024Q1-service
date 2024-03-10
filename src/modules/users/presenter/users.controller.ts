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
import { UsersService } from '../service/users.service';
import { UserResource } from './resources/user.resource';
import { UserWithoutPassword } from 'src/common/entities/user';
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
  getAllUsers(): UserWithoutPassword[] {
    const users = this.usersService.getAllUsers();

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
  getUserById(@Param() param: UserIdParam): UserWithoutPassword {
    const user = this.usersService.getUserById(param.user_id);

    return this.userResource.convert(user);
  }

  @ApiOkResponse({
    description: 'Create user',
    type: UserResponse,
  })
  @Post()
  @HttpCode(StatusCodes.CREATED)
  addUser(@Body() body: CreateUserBody): UserWithoutPassword {
    const user = this.usersService.addUser(body);

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
  updateUser(
    @Param() param: UserIdParam,
    @Body() body: ChangeUserBody,
  ): UserWithoutPassword {
    const user = this.usersService.updateUser(param.user_id, body);

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
  deleteUser(@Param() param: UserIdParam): void {
    this.usersService.deleteUser(param.user_id);
  }
}
