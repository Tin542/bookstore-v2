
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/modules/user/services/user.service';
import { comparePassword } from 'src/shared/utils/hash-password.util';
import { LoginResponseDto } from '../dto/login-response.dto';
import { plainToClass } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async signIn(username: string, pass: string): Promise<LoginResponseDto> {
    const user = await this.usersService.findByUsername(username);

    // Check if user existed
    if(!user) {
        throw new NotFoundException("Account not found");
    }

    // check if user is actived
    if(!user.isActive) {
        throw new BadRequestException("Account is deactive");
    }

    // check if password is corrected
    const checkPassword = await comparePassword(pass, user.password);
    if (!checkPassword) {
      throw new BadRequestException('Password is incorrect');
    }

    const payload = { sub: user.id, username: user.username, role: user.role.name };
    const accessToken = await this.jwtService.signAsync(payload);

    return plainToClass(LoginResponseDto, {...user, accessToken});
  }
}