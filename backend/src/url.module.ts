import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UrlController } from './controller/url.controller';
import { UrlService } from './service/url.service';
import { BaseRepository } from './repository/base.repository';
import { UrlRepository } from './repository/url.repository';
import { authenticationMiddleware } from './middleware/authentication';
import { verifyRoles } from './middleware/authorization';
import { Role } from './models/user.model';

@Module({
  controllers: [UrlController],
  providers: [BaseRepository, UrlRepository, UrlService],
})
export class UrlModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(authenticationMiddleware, verifyRoles([Role.Premium]))
      .forRoutes({ path: 'url/:shortUrl', method: RequestMethod.PUT });
    consumer
      .apply(authenticationMiddleware)
      .forRoutes({ path: 'url/email/:email', method: RequestMethod.GET });
  }
}
