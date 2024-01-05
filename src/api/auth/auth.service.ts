import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../user/schemas/user.schemas';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login,dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.getUserDetails({ email: username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const result = user;
      console.log(result);
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const payload = {
      username: loginDto.email,
      sub: {
        id: loginDto.email,
      },
    };

    return {
      message: `Logged in successFully for ${loginDto.email}`,
      accessToken: this.jwtService.sign(payload, {
        secret: process.env['JWT_SECRET'],
        expiresIn: process.env['JWT_EXPIRE_TIME'],
      }),
      tokenType: 'Bearer',
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env['JWT_SECRET'],
        expiresIn: process.env['JWT_REFRESH_EXPIRE_TIME'],
      }),
    };
  }

  async refreshToken(user: User) {
    const payload = {
      username: user.email,
      sub: {
        name: user.name,
      },
    };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env['JWT_SECRET'],
        expiresIn: process.env['JWT_REFRESH_EXPIRE_TIME'],
      }),
    };
  }
}
