import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { BaseRepository } from './repository/base.repository';
import { UserController } from './controller/user.controller';
import { UserRepository } from './repository/user.repository';
import { UserService } from './service/user.service';
import { authenticationMiddleware } from './middleware/authentication';

@Module({
  controllers: [UserController],
  providers: [BaseRepository, UserRepository, UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(authenticationMiddleware)
      .forRoutes(
        { path: 'user/:email', method: RequestMethod.GET },
        { path: 'user/:email', method: RequestMethod.PUT },
        { path: 'user/:email', method: RequestMethod.DELETE },
      );
  }
}
