import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { IsNull } from 'typeorm';
import { CreateUserDto } from '../dto/user-create.dto';
import { hashPassword } from 'src/shared/utils/hash-password.util';
import { Role } from 'src/database/entities/role.entity';

@Injectable()
export class UsersService {
  async findByUsername(username: string): Promise<User | null> {
    const user = await User.findOne({
      where: { username: username, deletedAt: IsNull() },
      relations: {
        role: true,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  }

  async findAllUser(): Promise<User[]> {
    return await User.find();
  }

  async getOneUser(id: number): Promise<User> {
    const user = await User.findOne({ where: { id: id, deletedAt: IsNull() } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async checkUserExists(username: string, email: string): Promise<void> {
    const user = await User.findOne({
      where: [
        { username }, // Check by username
        { email }, // Check by email
      ],
    });

    if (user) {
      throw new ConflictException(
        `User with username "${username}" or email "${email}" already exists.`,
      );
    }
  }

  async createUser(createUserDto: CreateUserDto, code?: string): Promise<User> {
    await this.checkUserExists(createUserDto.username, createUserDto.email);

    const role = await Role.findOne({ where: { id: createUserDto.role } });
    if (!role) {
      throw new NotFoundException('Role not found');
    }

    const newUser = new User();
    newUser.email = createUserDto.email;
    newUser.address = createUserDto.address;
    newUser.fullName = createUserDto.fullName;
    newUser.username = createUserDto.username;
    newUser.phoneNumber = createUserDto.phoneNumber;
    newUser.avatar = createUserDto.avatar;
    newUser.password = await hashPassword(createUserDto.password);
    newUser.code = code || ''
    newUser.role = role;
    newUser.isActive = false;
    newUser.createdAt = new Date();
    await newUser.save();

    return newUser;
  }
}
