import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDTO } from './dto/create-book.dto';
import { UpdateBookDTO } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  createBook(@Body() createBookDTO: CreateBookDTO) {
    return this.bookService.createBook(createBookDTO);
  }

  @Get('list')
  getAllBooks() {
    return this.bookService.getAllBooks();
  }

  @Patch(':id')
  updateBook(@Param('id') id: string, @Body() updateBookDTO: UpdateBookDTO) {
    return this.bookService.updateBook(id, updateBookDTO);
  }

  @Delete()
  deleteBook(@Query('id') id: string) {
    return this.bookService.deleteBookByID(id);
  }

  @Post('upload')
  async uploadBooks(@Body() books: CreateBookDTO[]) {
    return this.bookService.uploadBooksInBatches(books);
  }
}
