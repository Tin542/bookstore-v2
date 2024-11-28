import { IsString } from "class-validator";

export class TokenPayload {
  @IsString()
  sub: number;

  @IsString()
  username: string;
  
}