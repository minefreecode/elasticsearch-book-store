import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './shared/env/env.validator';
import { OrmModule } from './shared/db/typeorm/typeorm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: (env) => envSchema.parse(env),
    }),
    OrmModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
