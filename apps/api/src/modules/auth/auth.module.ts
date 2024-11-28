import { Module } from '@nestjs/common';
import { UsersModule } from '../user/user.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { AuthProvider } from './auth.provider';
import { MailService } from 'src/shared/services/mail/mail.service';

@Module({
  imports: [UsersModule],
  providers: [AuthService, MailService, ...AuthProvider],
  controllers: [AuthController],
})
export class AuthModule {}
