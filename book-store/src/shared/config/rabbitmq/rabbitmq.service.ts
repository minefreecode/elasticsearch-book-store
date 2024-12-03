import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class RabbitMQConfigService implements OnApplicationBootstrap {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  public async onApplicationBootstrap() {
    this.amqpConnection.channel.assertQueue('books_indexing_queue', {
      exchange: 'books',
      routingKey: 'INDEX.BOOKS.CREATE',
      createQueueIfNotExists: true,
    });

    this.amqpConnection.channel.assertQueue('books_search_queue', {
      exchange: 'books',
      routingKey: 'SEARCH.BOOKS.QUERY',
      createQueueIfNotExists: true,
    });

    this.amqpConnection.channel.bindQueue(
      'books_indexing_queue',
      'books',
      'INDEX.BOOKS.CREATE',
    );

    this.amqpConnection.channel.bindQueue(
      'books_search_queue',
      'books',
      'SEARCH.BOOKS.QUERY',
    );
  }
}
