import {
  Body,
  Controller,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { RefreshJwtGuard } from 'src/guards/refresh-jwt.auth.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login,dto';
import { Public } from 'src/decorators/public-guard.decorator';
import {
  COOKIE_SAME_SITE_POLICY,
  FALLBACK_VALUES,
} from 'src/constants/common.constants';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
  //cookie policies
  private sameSite: (typeof COOKIE_SAME_SITE_POLICY)[number];
  private refreshTokenMaxAge: number;
  private accessTokenMaxAge: number;
  private secure: boolean;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private readonly configService: ConfigService
  ) {
    this.initCookieConfig();
  }

  private initCookieConfig(): void {
    const policy = this.configService.get<
      (typeof COOKIE_SAME_SITE_POLICY)[number]
    >('COOKIE-SAME-SITE-POLICY');
    this.sameSite = COOKIE_SAME_SITE_POLICY.includes(policy) ? policy : 'none';
    this.secure =
      this.configService
        .get<string>('ENV', FALLBACK_VALUES.ENV)
        .toUpperCase() !== 'LOCAL';
    this.accessTokenMaxAge = this.configService.get<number>(
      'ACCESS-TOKEN-COOKIE-TIME',
      FALLBACK_VALUES.ACCESS_TOKEN_COOKIE_TIME
    ); // 4 hour accessToken valid time
    this.refreshTokenMaxAge = this.configService.get<number>(
      'REFRESH-TOKEN-COOKIE-TIME',
      FALLBACK_VALUES.REFRESH_TOKEN_COOKIE_TIME
    ); // 7 days refreshToken valid Time
  }

  //@UseGuards(LocalAuthGuard)
  //   @Post('login')
  //   async login(@Request() req) {
  //     return await this.authService.login(req.user);
  //   }
  @Public() //decorator to make this api accessible without access token, i.e bypass jwt guard.
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const loginResponse = await this.authService.login(loginDto);
    res.cookie('accessToken', loginResponse.accessToken, {
      httpOnly: true,
      secure: this.secure,
      sameSite: this.sameSite,
      maxAge: this.accessTokenMaxAge,
    });
    res.cookie('refreshToken', loginResponse.refreshToken, {
      httpOnly: true,
      secure: this.secure,
      sameSite: this.sameSite,
      maxAge: this.refreshTokenMaxAge,
    });
    return res.send({
      accessToken: loginResponse.accessToken,
      tokenType: loginResponse.tokenType,
      refreshToken: loginResponse.refreshToken,
    });
  }

  @Public()
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
