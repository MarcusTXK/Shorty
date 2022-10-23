import { Module } from '@nestjs/common';
import { BaseRepository } from './repository/base.repository';
import { UserController } from './controller/user.controller';
import { UserRepository } from './repository/user.repository';
import { UserService } from './service/user.service';

@Module({
  controllers: [UserController],
  providers: [BaseRepository, UserRepository, UserService],
})
export class UserModule {}
