import { Module, CacheModule } from '@nestjs/common';
import type { ClientOpts } from 'redis';
import { UrlController } from './controller/url.controller';
import { UrlService } from './service/url.service';
import { BaseRepository } from './repository/base.repository';
import { UrlRepository } from './repository/url.repository';
import { ConfigModule } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register<ClientOpts>({
      store: redisStore,
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
      ttl: 3600,
    }),
  ],
  controllers: [UrlController],
  providers: [BaseRepository, UrlRepository, UrlService],
})
export class AppModule {}
