import { Module } from '@nestjs/common';
import { UsersService } from './services/user.service';
import { userProvider } from './user.provider';
import { UserController } from './controllers/user.controller';

@Module({
  providers: [UsersService, ...userProvider],
  exports: [UsersService],
  controllers: [UserController]
})
export class UsersModule {}
