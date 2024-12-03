import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3007, () => {
    console.log(`🔎 Book-search app is running on http://localhost:${3007}`);
  });
}
bootstrap();
