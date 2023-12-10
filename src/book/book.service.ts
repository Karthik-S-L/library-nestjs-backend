import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  Types,
} from 'mongoose';
import { AddBookDto } from './dto/add-book.dto';
import { Book } from './schemas/book.schema';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private readonly bookModel: mongoose.Model<Book>
  ) {}

  async findAllBooks(): Promise<Book[]> {
    const books = await this.bookModel.find();
    return books;
  }

  async addBook(addBookDto: AddBookDto): Promise<Book> {
    const existingBook = await this.getBook({ title: addBookDto.title });
    if (existingBook) {
      throw new ConflictException({
        message: `Book with the title ${addBookDto.title} already present`,
      });
    }
    const res = await this.bookModel.create(addBookDto);
    return res;
  }

  async getBook(
    filter: FilterQuery<Book>,
    projection?: ProjectionType<Book>,
    options?: QueryOptions<Book>
  ): Promise<Book> {
    return await this.bookModel.findOne(filter, projection, options);
  }

  async getBookById(id: Types.ObjectId): Promise<Book> {
    const book = await this.getBook({ _id: id });
    return book;
  }

  async deleteBookById(id: Types.ObjectId): Promise<Book> {
    const book = await this.getBook({ _id: id });
    if (book) {
      await this.bookModel.findOneAndDelete(new Types.ObjectId(id));
    }
    return book;
  }

  async updateBookById(
    id: Types.ObjectId,
    updateBookDto: UpdateBookDto
  ): Promise<Book> {
    console.log('id is ', typeof id);
    return await this.bookModel.findOneAndUpdate(
      new Types.ObjectId(id),
      updateBookDto,
      {
        new: true,
        runValidators: true,
      }
    );
  }
}
