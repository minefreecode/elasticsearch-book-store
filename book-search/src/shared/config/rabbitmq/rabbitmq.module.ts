import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitMQConfigService } from './rabbitmq.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      //Создаём провайдер динамически
      useFactory: async () => ({
        uri: 'amqp://guest:guest@localhost:5672', //Адрес где расположен RabbitMQ
        exchanges: [ //Сюда отправляются сообщения
          {
            name: 'books',
            type: 'topic',
            options: {
              durable: true,
            },
          },
        ],
        prefetchCount: 1,
      }),
    }),
  ],
  exports: [RabbitMQModule],//Сервис RabbitMQModule экспортируется и доступен другим модулям
  providers: [RabbitMQConfigService], //Объявляем провайдер
})
export class RabbitMQConfigModule {}
