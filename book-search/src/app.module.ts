import { Module } from '@nestjs/common';
import { ElasticSearchModule } from './modules/elasticsearch/elasticsearch.module';

/**
 * Регистрируем сервис ElasticSearchModule в DI
 */
@Module({
  imports: [ElasticSearchModule], //Объявляем список импортируемых модулей, необъодимое данному модулю
  controllers: [],
  providers: [],
})
export class AppModule {}
