import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { EnvModule } from 'src/shared/env/env.module';
import { EnvService } from 'src/shared/env/env.service';
import { RabbitMQConfigService } from './rabbitmq.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: async (envService: EnvService) => ({
        uri: envService.get('RABBIT_URI'),
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
