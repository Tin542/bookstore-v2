import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiBody } from '@nestjs/swagger';
import { LoginDto } from '../dto/login.dto';
import { Public } from 'src/shared/decorators/auth/public.decorator';
import { CreateUserDto } from 'src/modules/user/dto/user-create.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('/login')
  @ApiBody({ type: LoginDto })
  signIn(@Body() signInDto: LoginDto) {
    const logger = new Logger('Login');
    try {
      const result = this.authService.signIn(
        signInDto.username,
        signInDto.password,
      );
      return result;
    } catch (error) {
      logger.error(error.message);
    }
  }

  @Public()
  @Post('/register')
  @ApiBody({ type: CreateUserDto })
  signUp(@Body() signUpDto: CreateUserDto) {
    const logger = new Logger('Register');
    try {
      const result = this.authService.register(signUpDto);
      return result;
    } catch (error) {
      logger.error(error.message);
    }
  }
}
