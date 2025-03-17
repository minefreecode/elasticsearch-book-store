import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * Старт приложения
 */
async function bootstrap() {
  //Создаем проект из AppModule
  const app = await NestFactory.create(AppModule);

  //Приложение запускает сервер и слушает порт 3007
  await app.listen(3007, () => {
    console.log(`🔎 Book-search app is running on http://localhost:${3007}`);
  });
}
bootstrap();//Запуск
