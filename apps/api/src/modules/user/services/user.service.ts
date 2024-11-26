import { Injectable } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { IsNull } from 'typeorm';

@Injectable()
export class UsersService {
  async findByUsername(username: string): Promise<User | null> {
    const user = await User.findOne({
      where: { username: username, deletedAt: IsNull() },
      relations:{
        role: true
      }
    });
    if (!user) {
      return null;
    }
    return user;
  }

  async findAllUser(): Promise<User[]> {
    return await User.find();
  }
}
