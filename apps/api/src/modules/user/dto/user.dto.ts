import { Exclude } from "class-transformer";
import { User } from "src/database/entities/user.entity";

export class UserDto extends User {
    @Exclude()
    password: string;
}