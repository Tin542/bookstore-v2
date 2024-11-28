import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/modules/user/services/user.service';
import { comparePassword } from 'src/shared/utils/hash-password.util';
import { LoginResponseDto } from '../dto/login-response.dto';
import { plainToClass } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../dto/payload.dto';
import { CreateUserDto } from 'src/modules/user/dto/user-create.dto';
import { User } from 'src/database/entities/user.entity';
import { MailService } from 'src/shared/services/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService
  ) {}

  generateRefreshToken(payload: TokenPayload) {
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    });
    if (!token) {
      throw new BadRequestException('Failed to verify token');
    }
    return token;
  }

  async signIn(username: string, pass: string): Promise<LoginResponseDto> {
    const user = await this.usersService.findByUsername(username);

    // Check if user existed
    if (!user) {
      throw new NotFoundException('Account not found');
    }

    // check if user is actived
    if (!user.isActive) {
      throw new BadRequestException('Account is deactive');
    }

    // check if password is corrected
    const checkPassword = await comparePassword(pass, user.password);
    if (!checkPassword) {
      throw new BadRequestException('Password is incorrect');
    }

    // Generate refresh token
    if (!user.refreshToken) {
      user.refreshToken = this.generateRefreshToken({
        sub: user.id,
        username: user.username,
      });
      await user.save();
    }

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role.name,
    };
    const accessToken = await this.jwtService.signAsync(payload);

    return plainToClass(LoginResponseDto, { ...user, accessToken });
  }

  async register(registerDto: CreateUserDto): Promise<User> {
    if(registerDto.role === 1) {
      throw new BadRequestException("Role is not valid");
    }
    const result = await this.usersService.createUser(registerDto);

    // Verify email
    const code = Math.floor(100000 + Math.random() * 900000);
    const message = `Your code is ${code}`;
    const subject = 'Account activation for Book store';
    const mail = await this.mailService.sendMail(message, subject, registerDto.email);
    console.log('mail: ', mail)
    return result ;
  }
}
