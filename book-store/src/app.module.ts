import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './shared/env/env.validator';
import { OrmModule } from './shared/db/typeorm/typeorm.module';
import { BookModule } from './modules/book/book.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: (env) => envSchema.parse(env),
    }),
    OrmModule, //Включаем в приложение модуль ORM
    BookModule,//Включаем в приложение контроллер для работы с книгами
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
