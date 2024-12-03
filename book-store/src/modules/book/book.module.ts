import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { RabbitMQConfigModule } from 'src/shared/config/rabbitmq/rabbitmq.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), RabbitMQConfigModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
