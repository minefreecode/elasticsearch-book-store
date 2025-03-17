import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';
import { CreateBookDTO } from './dto/create-book.dto';
import { UpdateBookDTO } from './dto/update-book.dto';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

/**
 * Это провайдер для использования книг из контроллера
 */
@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  async createBook(book: CreateBookDTO): Promise<Book> {
    this.amqpConnection.publish('books', 'INDEX.BOOKS.CREATE', book);
    return this.bookRepository.save(book);
  }

  async getAllBooks(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async updateBook(id: string, book: UpdateBookDTO): Promise<Book> {
    await this.bookRepository.update({ id }, book);
    return this.bookRepository.findOne({
      where: { id },
    });
  }

  async deleteBookByID(id: string): Promise<Book> {
    await this.bookRepository.softDelete(id);
    return this.bookRepository.findOne({
      where: { id },
      withDeleted: true,
    });
  }

  async uploadBooksInBatches(
    books: CreateBookDTO[],
  ): Promise<{ batchSize: number; message: string }> {
    const BATCH_SIZE = 100;

    const batches = [];
    for (let i = 0; i < books.length; i += BATCH_SIZE) {
      batches.push(books.slice(i, i + BATCH_SIZE));
    }

    await Promise.all(
      batches.map(async (batch) => {
        await this.bookRepository.manager.transaction(
          async (transactionalEntityManager) => {
            await transactionalEntityManager.insert(Book, batch);
          },
        );
      }),
    );

    return {
      batchSize: BATCH_SIZE,
      message: `${BATCH_SIZE} Books uploaded successfully!`,
    };
  }
}
