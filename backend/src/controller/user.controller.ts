import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  HttpException,
  HttpStatus,
  HttpCode,
  Delete,
  Req,
} from '@nestjs/common';
import { AuthRequest } from 'src/util/auth';
import { CreateUserDto, createUserSchema } from '../dto/user/create-user.dto';
import { LoginUserDto, loginUserSchema } from '../dto/user/login-user.dto';
import { UpdateUserDto, updateUserSchema } from '../dto/user/update-user.dto';
import { UserService } from '../service/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // For testing purposes only
  @Get('user')
  async getUsers() {
    try {
      return await this.userService.getAllUsers();
    } catch (e: any) {
      console.error(e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('user/:email')
  async getUserByEmail(@Param('email') email: string, @Req() req: AuthRequest) {
    try {
      if (req.user.email !== email) {
        throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
      }
      return await this.userService.getUserByEmail(email);
    } catch (e: any) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('user')
  async createUser(@Body() userDto: CreateUserDto) {
    try {
      const { error, value } = createUserSchema.validate(userDto);
      if (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      return await this.userService.createUser(value);
    } catch (e: any) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('user/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() userDto: LoginUserDto) {
    try {
      const { error, value } = loginUserSchema.validate(userDto);
      if (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      const accessToken = await this.userService.login(
        value.email,
        value.password,
      );
      if (!accessToken) {
        throw new HttpException(
          'User does not exist or Wrong login credentials entered',
          HttpStatus.UNAUTHORIZED,
        );
      }
      return { accessToken };
    } catch (e: any) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('user/:email')
  async updateUserByEmail(
    @Param('email') email: string,
    @Req() req: AuthRequest,
    @Body() userDto: UpdateUserDto,
  ) {
    try {
      if (req.user.email !== email) {
        throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
      }
      const { error, value } = updateUserSchema.validate(userDto);
      if (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      return await this.userService.updateUser(email, value);
    } catch (e: any) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('user/:email')
  async deleteUserByEmail(
    @Param('email') email: string,
    @Req() req: AuthRequest,
  ) {
    try {
      if (req.user.email !== email) {
        throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
      }
      return await this.userService.deleteUserByEmail(email);
    } catch (e: any) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
