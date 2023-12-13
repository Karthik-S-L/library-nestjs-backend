import { Transform } from 'class-transformer';
import { IsOptional, ValidateIf } from 'class-validator';
import { Types } from 'mongoose';

export class BookQueryDto {
  @ValidateIf((_, value) => value !== undefined)
  @Transform(({ value }) =>
    value !== undefined ? new Types.ObjectId(value) : undefined
  )
  id: Types.ObjectId;
}

//Pagination Dto Logic
export enum OrderDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PaginationDto {
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @ValidateIf((_, value) => value !== undefined)
  limit?: number = 5;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @ValidateIf((_, value) => value !== undefined)
  page?: number = 1;

  @IsOptional()
  @ValidateIf((_, value) => value !== undefined)
  order?: OrderDirection = OrderDirection.ASC;
}
