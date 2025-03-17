import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';// Для подписки из RabbitMQ
import { Book } from './types/book';

/**
 * Сервис Elastic Search
 * Помечаем сервис ElasticSearchService как провайдер
 * ElasticSearchService это провайдер доступный для управления контейнером IoC
 */
//Сервис для создания очередей в RabbitMQ если они еще не существуют
@Injectable()
export class ElasticSearchService {
  /**
   * Включается подписка RabbitMQ
   *
   * @param book
   */
  @RabbitSubscribe({
    exchange: 'books',//Сюда отправляются сообщения
    routingKey: 'INDEX.BOOKS.CREATE', //Ключ маршрутизации
    queue: 'elastic_indexer_queue', //Очередь RabbitMQ
    createQueueIfNotExists: true,//Создает очередь если она не существует
  })
  /**
   *
   */
  async handleIndexingMessage(book: Book) {
    console.log('Received message for indexing:', book);
  }

  @RabbitSubscribe({
    exchange: 'books',//Сюда отправляются сообщения
    routingKey: 'SEARCH.BOOKS.QUERY',//Ключ маршрутизации
    queue: 'elastic_search_queue',//Очередь
    createQueueIfNotExists: true,//Создавать если не существует
  })
  async handleSearchMessage(message: any) {
    console.log('Received search request:', message);
  }
}
