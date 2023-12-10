import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { AddBookDto } from './dto/add-book.dto';
import { BookQueryDto } from './dto/book-query.dto';
import { Book } from './schemas/book.schema';

@Controller('books')
export class BookController {
  constructor(private readonly booksService: BookService) {}

  @Get('bookId/')
  async getBookById(@Query() query: BookQueryDto): Promise<Book> {
    const book = await this.booksService.getBookById(query.id);
    if (!book) {
      throw new NotFoundException({ message: 'Book not found' });
    }
    return book;
  }

  //Get all books in the library
  @Get('/')
  async getAllBooks(): Promise<Book[]> {
    const books = await this.booksService.findAllBooks();
    return books;
  }

  @Post('/')
  async addBook(@Body() addBookDto: AddBookDto): Promise<Book> {
    const response = await this.booksService.addBook(addBookDto);
    return response;
  }

  @Patch('/updateBook')
  async updateBookById(
    @Query() query: BookQueryDto,
    @Body() addBookDto: AddBookDto
  ): Promise<Book> {
    const response = await this.booksService.updateBookById(
      query.id,
      addBookDto
    );
    if (!response) {
      throw new NotFoundException({ message: 'Book not found' });
    }
    return response;
  }

  @Delete('bookId/')
  async deleteBookById(@Query() query: BookQueryDto): Promise<Book> {
    const book = await this.booksService.deleteBookById(query.id);
    if (!book) {
      throw new NotFoundException({ message: 'Book not found' });
    }
    return book;
  }
}
