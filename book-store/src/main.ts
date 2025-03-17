import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Включаем CORS
  app.enableCors({
    origin: '*',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true,
    }),
  );
  app.use(json({ limit: '50mb' }));

  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(
      `📘 Book-store app is running on http://localhost:${process.env.PORT ?? 3000}`,
    );
  });
}
bootstrap();
