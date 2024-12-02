import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';
import { CreateBookDTO } from '../dto/create-book.dto';
import { UpdateBookDTO } from '../dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async createBook(book: CreateBookDTO): Promise<Book> {
    return this.bookRepository.save(book);
  }

  async getAllBooks(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async updateBook(id: string, book: UpdateBookDTO): Promise<Book> {
    await this.bookRepository.update({ bookId: id }, book);
    return this.bookRepository.findOne({
      where: { bookId: id },
    });
  }

  async deleteAllBooks(id: string): Promise<Book> {
    await this.bookRepository.softDelete(id);
    return this.bookRepository.findOne({
      where: { bookId: id },
      withDeleted: true,
    });
  }
}
