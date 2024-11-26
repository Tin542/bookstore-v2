import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ name: 'username', type: String, required: true })
  username: string;

  @ApiProperty({ name: 'password', type: String, required: true })
  password: string;
}
