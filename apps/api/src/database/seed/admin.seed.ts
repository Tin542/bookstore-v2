import { DataSource } from 'typeorm';
import { Logger, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { hashPassword } from 'src/shared/utils/hash-password.util';
import { ConfigService } from '@nestjs/config';
import { Role } from '../entities/role.entity';
import { ROLE } from 'src/shared/utils/constants';

export async function AdminSeeder(
  dataSource: DataSource,
  configService: ConfigService,
) {
  const logger = new Logger('Seeder');

  logger.log(`Seeding admin's data...`);

  const userRepository = dataSource.getRepository(User);
  const roleRepository = dataSource.getRepository(Role);
  const defaultPassword = configService.get<string>('DEFAULT_PASSWORD');
  if (!defaultPassword) {
    throw new Error('Cannot get password');
  }
  const password = await hashPassword(defaultPassword);
  const role = await roleRepository.findOne({
    where: {
      name: ROLE.ADMIN,
    },
  });
  if (!role) {
    throw new NotFoundException('Role not found');
  }
  const adminInfo = new User();
    (adminInfo.email = 'admin@gmail.com'),
    (adminInfo.address = '62 L Cu Xa Phu Lam D, P10, Q6'),
    (adminInfo.fullName = 'Nguyen Van A'),
    (adminInfo.isActive = true),
    (adminInfo.avatar = ''),
    (adminInfo.username = 'admin'),
    (adminInfo.role = role),
    (adminInfo.password = password);
    adminInfo.phoneNumber = '0773114946'

  const existingAdmin = await userRepository.findOne({
    where: { username: 'admin' },
  });

  if (!existingAdmin) {
    await userRepository.save(adminInfo);
    logger.log('Admin seeded successfuly');
  } else {
    logger.log('Admin is already existed.');
  }
}
