import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ProxyResultData = any;

@Injectable()
export class ProxyService {
  constructor(private readonly _configService: ConfigService) {}

  public proxy(resultData: ProxyResultData): Promise<ProxyResultData> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(resultData);
      }, this._configService.get('delay'));
    });
  }
}
