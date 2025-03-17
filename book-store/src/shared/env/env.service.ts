import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Env } from './env.validator';

/**
 * Помечаем EnvService как провайдер
 * Это класс доступный для управления серверами IoC
 */
@Injectable()
export class EnvService {
  //Конструктор. Сюда включается сервис ConfigService
  constructor(private readonly configService: ConfigService<Env, true>) {}
 // Логгер
  private readonly logger = new Logger(EnvService.name);

  //Получаем конфигурацию по ключу
  get<T extends keyof Env>(key: T): Env[T] {
    this.logger.log(`Retrieved value for key: ${key}`);
    return this.configService.get<Env>(key, { infer: true });//Возврашаем конфигурацию с помощью включенного сервиса
  }
}
