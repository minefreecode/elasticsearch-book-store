import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Book } from './types/book';

@Injectable()
export class ElasticSearchService {
  @RabbitSubscribe({
    exchange: 'books',
    routingKey: 'INDEX.BOOKS.CREATE',
    queue: 'elastic_indexer_queue',
    createQueueIfNotExists: true,
  })
  async handleIndexingMessage(book: Book) {
    console.log('Received message for indexing:', book);
  }

  @RabbitSubscribe({
    exchange: 'books',
    routingKey: 'SEARCH.BOOKS.QUERY',
    queue: 'elastic_search_queue',
    createQueueIfNotExists: true,
  })
  async handleSearchMessage(message: any) {
    console.log('Received search request:', message);
  }
}
