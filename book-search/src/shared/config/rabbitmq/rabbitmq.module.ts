import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitMQConfigService } from './rabbitmq.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: async () => ({
        uri: 'amqp://guest:guest@localhost:5672',
        exchanges: [
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
  exports: [RabbitMQModule],
  providers: [RabbitMQConfigService],
})
export class RabbitMQConfigModule {}
