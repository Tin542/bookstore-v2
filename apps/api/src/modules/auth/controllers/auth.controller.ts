import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Logger,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { LoginDto } from '../dto/login.dto';
import { Roles } from 'src/shared/decorators/auth/role.decorator';
import { RoleEnum } from 'src/shared/enum';
import { RolesGuard } from '../guard/role.guard';
import { Public } from 'src/shared/decorators/auth/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
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

  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
