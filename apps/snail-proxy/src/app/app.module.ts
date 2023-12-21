import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './config/config';
import { ProxyService } from './services/proxy/proxy.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: 'apps/snail-proxy/.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ProxyService],
})
export class AppModule {}
