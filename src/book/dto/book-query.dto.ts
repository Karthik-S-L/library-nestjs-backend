import { Transform } from 'class-transformer';
import { ValidateIf } from 'class-validator';
import { Types } from 'mongoose';

export class BookQueryDto {
  @ValidateIf((_, value) => value !== undefined)
  @Transform(({ value }) =>
    value !== undefined ? new Types.ObjectId(value) : undefined
  )
  id: Types.ObjectId;
}
