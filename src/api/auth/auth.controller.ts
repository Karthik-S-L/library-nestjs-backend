import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { RefreshJwtGuard } from 'src/guards/refresh-jwt.auth.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login,dto';
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  //@UseGuards(LocalAuthGuard)
  //   @Post('login')
  //   async login(@Request() req) {
  //     return await this.authService.login(req.user);
  //   }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.signUpUser(createUserDto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}
