import { Module } from '@nestjs/common';
import { UrlController } from './controller/url.controller';
import { UrlService } from './service/url.service';
import { BaseRepository } from './repository/base.repository';
import { UrlRepository } from './repository/url.repository';

@Module({
  controllers: [UrlController],
  providers: [BaseRepository, UrlRepository, UrlService],
})
export class UrlModule {}
