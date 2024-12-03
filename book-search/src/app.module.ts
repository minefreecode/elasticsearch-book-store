import { Module } from '@nestjs/common';
import { ElasticSearchModule } from './modules/elasticsearch/elasticsearch.module';

@Module({
  imports: [ElasticSearchModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
