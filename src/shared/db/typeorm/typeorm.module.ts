import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvModule } from '../../env/env.module';
import { EnvService } from '../../env/env.service';
import { NODE_ENV } from 'src/shared/env/env.validator';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: async (env: EnvService) => {
        const nodeEnv = env.get('NODE_ENV');
        const isDevelopment = nodeEnv === NODE_ENV.DEVELOPMENT;
        return {
          type: 'postgres',
          autoLoadEntities: true,
          url: env.get('DATABASE_URL'),
          synchronize: isDevelopment,
          logging: isDevelopment,
          logNotifications: true,
          migrationsRun: true,
          migrations: ['dist/db/typeorm/migrations/*{.ts,.js}'],
        };
      },
    }),
  ],
})
export class OrmModule {}
