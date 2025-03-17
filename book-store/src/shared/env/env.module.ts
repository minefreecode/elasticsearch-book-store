import { Module } from '@nestjs/common';
import { EnvService } from './env.service';

/**
 *
 */
@Module({
  providers: [EnvService],//Объявляем сервис как провайдер
  exports: [EnvService],//Экспортируем сервис
})
export class EnvModule {}
