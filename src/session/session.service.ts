import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class SessionService {
  constructor(
    @Inject(RedisService)
    private redisService: RedisService,
  ) {}

  async setSession(
    key: string | undefined,
    value: Record<string, any>,
    expire?: number,
  ) {
    if (key) {
      await this.redisService.hashSet(`sid:${key}`, value, expire);
      return key;
    } else {
      const sid = uuidV4();
      await this.redisService.hashSet(`sid:${sid}`, value, expire);
      return sid;
    }
  }

  async getSession<T extends Record<string, string>>(
    sid: string,
  ): Promise<T | void>;
  async getSession(sid: string) {
    const data = await this.redisService.hashGet(`sid:${sid}`);
    if (JSON.stringify(data) === '{}') {
      return undefined;
    }
    return data;
  }
}
