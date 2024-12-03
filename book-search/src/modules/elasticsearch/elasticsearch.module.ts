import { Module } from '@nestjs/common';
import { RabbitMQConfigModule } from 'src/shared/config/rabbitmq/rabbitmq.module';
import { ElasticSearchService } from './elasticsearch.service';

@Module({
  imports: [RabbitMQConfigModule],
  providers: [ElasticSearchService],
})
export class ElasticSearchModule {}
