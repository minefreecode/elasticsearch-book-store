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
  //Создаем контроллер. При этом создается сервис
  constructor(private readonly bookService: BookService) {}

  //Создание книги
  @Post()
  createBook(@Body() createBookDTO: CreateBookDTO) {
    return this.bookService.createBook(createBookDTO); //Создаётся книга по DTO
  }

  /**
   * Получаем список книг
   */
  @Get('list')
  getAllBooks() {
    return this.bookService.getAllBooks();//Получаем все книги
  }

  /**
   * Обновление книг по идентификатору
   *
   * @param id
   * @param updateBookDTO
   */
  @Patch(':id')
  updateBook(@Param('id') id: string, @Body() updateBookDTO: UpdateBookDTO) {
    return this.bookService.updateBook(id, updateBookDTO);
  }

  /**
   * Удаление книги
   *
   * @param id
   */
  @Delete()
  deleteBook(@Query('id') id: string) {
    return this.bookService.deleteBookByID(id);
  }

  /**
   * Загрузка книги
   * @param books
   */
  @Post('upload')
  async uploadBooks(@Body() books: CreateBookDTO[]) {
    return this.bookService.uploadBooksInBatches(books);
  }
}
