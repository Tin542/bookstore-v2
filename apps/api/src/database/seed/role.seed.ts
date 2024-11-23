import { DataSource } from 'typeorm';
import { Role } from '../entities/role.entity';
import { Logger } from '@nestjs/common';

export async function RoleSeeder(dataSource: DataSource) {
  const logger = new Logger('Seeder');

  logger.log(`Seeding role's data...`);

  const roleRepository = dataSource.getRepository(Role);

  const rolesToSeed = [
    { name: 'ADMIN', createdAt: new Date() },
    { name: 'MANAGER', createdAt: new Date() },
    { name: 'CUSTOMER', createdAt: new Date() },
  ];

  for (const roleData of rolesToSeed) {
    // Check if the role already exists
    const existingRole = await roleRepository.findOne({
      where: { name: roleData.name },
    });

    if (!existingRole) {
      // Create and save the role if it doesn't exist
      const role = roleRepository.create(roleData);
      await roleRepository.save(role);
      logger.log(`Role '${roleData.name}' added.`);
    } else {
      logger.log(`Role '${roleData.name}' already existed.`);
    }
  }
}
