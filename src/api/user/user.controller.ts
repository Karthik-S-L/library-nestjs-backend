import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ExtractKeyFromRequest } from 'src/decorators/custom-request-data.decorator';
import { SuccessResponseType, UserRequestType } from '../@types';
import { User } from './schemas/user.schemas';
import { UserQueryDto } from './dto/user-query.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signUp')
  async signUpUser(@Body() createUserDto: CreateUserDto) {
    const res = await this.userService.signUpUser(createUserDto);
    if (!res) {
      throw new InternalServerErrorException('Something went wrong');
    }
    return {
      message: 'User created successfully',
      result: res,
    };
  }

  // @Get()
  // async fetchUserDetails(
  //   @ExtractKeyFromRequest('user') user: UserRequestType
  // ): Promise<SuccessResponseType<User>> {
  //   console.log(user);
  //   const userData = await this.userService.fetchUserDetails(user);
  //   return {
  //     statusCode: 200,
  //     message: `User info fetched successfully`,
  //     result: userData,
  //   };
  // }

  @Get('userId/')
  async getUserById(
    @Query() userQueryDto: UserQueryDto
  ): Promise<SuccessResponseType<User>> {
    const userData = await this.userService.getUserById(userQueryDto);
    return {
      statusCode: 200,
      message: `User info of user ${userQueryDto.id} fetched successfully`,
      result: userData,
    };
  }
}
