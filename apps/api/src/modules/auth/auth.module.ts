import { Module } from '@nestjs/common';
import { UsersModule } from '../user/user.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { AuthProvider } from './auth.provider';

@Module({
  imports: [UsersModule],
  providers: [AuthService, ...AuthProvider],
  controllers: [AuthController],
})
export class AuthModule {}
