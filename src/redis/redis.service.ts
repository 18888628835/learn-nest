import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  constructor(
    @Inject('REDIS_CLIENT')
    private redisClient: RedisClientType,
  ) {}

  async hashGet(key: string) {
    return await this.redisClient.hGetAll(key);
  }

  async hashSet(key: string, data: Record<string, any>, expire?: number) {
    const keyNames = Object.keys(data);

    for (const keyName of keyNames) {
      await this.redisClient.hSet(key, keyName, data[keyName]);
    }

    if (expire) {
      await this.redisClient.expire(key, expire);
    }
  }
}
