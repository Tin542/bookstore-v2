import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { User } from "src/database/entities/user.entity";

export class LoginResponseDto extends User {
    @Exclude()
    password: string;

    @Exclude()
    createdAt: Date;

    @Exclude()
    deletedAt: Date | null;

    @Exclude()
    updatedAt: Date;

    @ApiProperty({name: 'Access token', type: String})
    accessToken: string;
}