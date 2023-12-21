/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import proxy from 'express-http-proxy';

import { AppModule } from './app/app.module';
import {
  ProxyResultData,
  ProxyService,
} from './app/services/proxy/proxy.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'fatal', 'error', 'warn', 'debug'],
  });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const configService = app.get(ConfigService);
  const port = configService.get('port');

  const proxyService = app.get(ProxyService);
  app.use(
    '/proxy',
    proxy('jsonplaceholder.typicode.com', {
      userResDecorator: (_, proxyResData: ProxyResultData) => {
        return proxyService.proxy(proxyResData);
      },
    })
  );

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
