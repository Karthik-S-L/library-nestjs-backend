import { IsNotEmpty, IsString } from 'class-validator';

export class UserQueryDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
