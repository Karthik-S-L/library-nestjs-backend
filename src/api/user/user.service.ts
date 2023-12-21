import { ConflictException, Injectable } from '@nestjs/common';
import mongoose, {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  Types,
} from 'mongoose';
import { User } from './schemas/user.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserRequestType } from '../@types';
import { UserQueryDto } from './dto/user-query.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: mongoose.Model<User | null>
  ) {}

  async getUserDetails(
    filter: FilterQuery<User>,
    projection?: ProjectionType<User>,
    options?: QueryOptions<User>
  ): Promise<User> {
    return await this.userModel.findOne(filter, projection, options);
  }

  async signUpUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.getUserDetails({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new ConflictException('User(email) already present');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    const userId = new Types.ObjectId();
    const res = await this.userModel.create({
      _id: userId,
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
    });
    return res;
  }

  async fetchUserDetails(user: UserRequestType): Promise<User> {
    const userData = await this.getUserDetails({ id: user.id });
    return userData;
  }

  async getUserById(userQueryDto: UserQueryDto): Promise<User> {
    const userId = new Types.ObjectId(userQueryDto.id);
    console.log(
      '🚀 ~ file: user.service.ts:56 ~ UserService ~ getUserById ~ userI̥:',
      userId
    );
    const userData = await this.getUserDetails({ _id: userQueryDto.id });
    return userData;
  }
}
