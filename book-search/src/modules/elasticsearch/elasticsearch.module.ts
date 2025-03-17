import { Module } from '@nestjs/common';
import { RabbitMQConfigModule } from 'src/shared/config/rabbitmq/rabbitmq.module';
import { ElasticSearchService } from './elasticsearch.service';

/**
 *
 */
@Module({
  imports: [RabbitMQConfigModule],//Список импортируемых модулей. Опеределяем модуль для работы с RabbitMQ
  //Сервис создания очередей RabbitMQ если они не существуют и включения к ним подписки
  providers: [ElasticSearchService],//Объявляем провайдер, который инстанцируется Nest и может использоваться любыми частями модуля
})
export class ElasticSearchModule {}
