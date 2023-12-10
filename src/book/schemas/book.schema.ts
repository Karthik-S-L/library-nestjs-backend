import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category } from '../enums/book-category.enum';
import mongoose, { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Book {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  price: number;

  @Prop({ enum: Category })
  category: Category;
}

export const BooksSchema = SchemaFactory.createForClass(Book);
