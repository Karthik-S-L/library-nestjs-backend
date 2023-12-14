import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsString, ValidateIf } from 'class-validator';
import { Category } from '../enums/book-category.enum';

export class UpdateBookDto {
  @ValidateIf((_, value) => value !== undefined) //Used to make validation only if value is present to avoid SQL Injection.
  @IsString({ message: 'Title should be string value' })
  readonly title?: string;

  @ValidateIf((_, value) => value !== undefined)
  @IsString({ message: 'Description should be string value' })
  readonly description?: string;

  @ValidateIf((_, value) => value !== undefined)
  @IsString({ message: 'Author should be string value' })
  readonly author?: string;

  @ValidateIf((_, value) => value !== undefined)
  @IsNumber({ allowNaN: false }, { message: 'Price should be number' })
  @Transform(({ value }) => value !== '' && Number(value))
  readonly price?: string;

  @ValidateIf((_, value) => value !== undefined)
  @IsEnum(Object.values(Category), {
    message: 'Category should :Adventure,Classic,Crime,Fantasy',
  })
  readonly category?: Category;
}
