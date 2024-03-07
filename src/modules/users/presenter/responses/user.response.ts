import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({
    description: 'User id',
    example: '6839c0fe-ea36-4f17-87af-8509cef7ace1',
  })
  id: string;

  @ApiProperty({
    description: 'User login',
    example: 'John',
  })
  login: string;

  @ApiProperty({
    description: 'User version',
    example: '1',
  })
  version: string;

  @ApiProperty({
    description: 'User creation date',
    example: 1709734225190,
  })
  createdAt: number;

  @ApiProperty({
    description: 'User update date',
    example: 1709734225190,
  })
  updatedAt: number;
}
