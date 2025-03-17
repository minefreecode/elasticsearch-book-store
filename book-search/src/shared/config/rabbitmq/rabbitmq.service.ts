import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class RabbitMQConfigService implements OnApplicationBootstrap {
  constructor(private readonly amqpConnection: AmqpConnection) {} //На входе принимает соединение с RabbitMQ

  //Вызывается после того как все модули были инициализированы но до прослушки сообщений
  public async onApplicationBootstrap() {
    //Проверяет очередь в RabbitMQ на сущестсование
    this.amqpConnection.channel.assertQueue('books_indexing_queue', {
      exchange: 'books',
      routingKey: 'INDEX.BOOKS.CREATE',
      createQueueIfNotExists: true,
    });
  //Проверяет очередь в RabbitMQ на сущестсование
    this.amqpConnection.channel.assertQueue('books_search_queue', {
      exchange: 'books',
      routingKey: 'SEARCH.BOOKS.QUERY',
      createQueueIfNotExists: true,
    });

    //Связывает путь rabbitMQ
    this.amqpConnection.channel.bindQueue(
      'books_indexing_queue',
      'books',
      'INDEX.BOOKS.CREATE',
    );

    //Связывает путь rabbitMQ
    this.amqpConnection.channel.bindQueue(
      'books_search_queue',
      'books',
      'SEARCH.BOOKS.QUERY',
    );
  }
}
