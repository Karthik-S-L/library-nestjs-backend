import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { Category } from '../enums/book-category.enum';
import { Transform } from 'class-transformer';

export class AddBookDto {
  @ValidateIf((_, value) => value !== undefined) //Used to make validation only if value is present to avoid SQL Injection.
  @IsString({ message: 'Title should be string value' })
  @IsNotEmpty()
  readonly title: string;

  @ValidateIf((_, value) => value !== undefined)
  @IsString({ message: 'Description should be string value' })
  @IsOptional()
  readonly description: string;

  @ValidateIf((_, value) => value !== undefined)
  @IsString({ message: 'Author should be string value' })
  @IsNotEmpty()
  readonly author: string;

  @ValidateIf((_, value) => value !== undefined)
  @IsNumber({ allowNaN: false }, { message: 'Price should be number' })
  @Transform(({ value }) => value !== '' && Number(value))
  @IsNotEmpty()
  readonly price: string;

  @ValidateIf((_, value) => value !== undefined)
  @IsEnum(Object.values(Category), {
    message: 'Category should :Adventure,Classic,Crime,Fantasy',
  })
  @IsNotEmpty()
  readonly category: Category;
}
