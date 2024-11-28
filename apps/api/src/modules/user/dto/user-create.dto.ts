import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    description: 'Unique username for the user',
    example: 'johndoe',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'StrongPassword123!',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Phone number of the user',
    example: '+1234567890',
  })
  @IsNumberString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    description: 'Address of the user',
    example: ' 123 Baker St.',
  })
  address: string;

  @ApiProperty({
    description: 'URL or path to the user avatar image',
    example: 'https://example.com/avatar.jpg',
  })
  @IsString()
  avatar: string;

  @ApiProperty({
    description: 'Role of the user represented by a numeric code',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  role: number;
}
