import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { RoleSeeder, AdminSeeder, AboutUsSeeder } from './seed';

export const DatabaseProvider = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],

  useFactory: async (configService: ConfigService) => {
    const logger = new Logger('DatabaseProvider');

    const dbHost = configService.get<string>('DB_HOST', 'localhost');
    const dbPort = configService.get<number>('DB_PORT', 5432);
    const dbUser = configService.get<string>('DB_USERNAME');
    const dbPass = configService.get<string>('DB_PASSWORD');
    const dbName = configService.get<string>('DB_NAME');
    const dbSynchronize = configService.get<boolean>('DB_SYNCHRONIZE', false);
    const dbLogging = configService.get<boolean>('DB_LOGGING', false);
    const dbDrop = configService.get<boolean>('DB_DROP', false);
    const dbSeed = configService.get<boolean>('DB_SEED', false);

    try {
      const dataSource = new DataSource({
        type: 'postgres',
        host: dbHost,
        port: dbPort,
        username: dbUser,
        password: dbPass,
        database: dbName,
        synchronize: dbSynchronize,
        logging: dbLogging,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Get all model in model folder
      });

      logger.log('Attempting to connect to the database...');
      await dataSource.initialize();

      // Drop all tables and recreate
      if (dbDrop === true) {
        const queryRunner = dataSource.createQueryRunner();
        await queryRunner.connect();

        logger.log('Dropping all tables and recreating the schema...');
        await queryRunner.query(`DROP SCHEMA public CASCADE;`); // Drops all tables in PostgreSQL
        await queryRunner.query(`CREATE SCHEMA public;`); // Recreates the default schema
        await queryRunner.release();

        logger.log('Schema dropped and recreated successfully.');
      }

      // synchronize database
      if (dbSynchronize === true) {
        logger.log('Synchronizing the database schema...');
        await dataSource.synchronize();
        logger.log('Database schema synchronized successfully.');
      }

      // Seed data
      if (dbSeed === true) {
        await RoleSeeder(dataSource);
        await AdminSeeder(dataSource, configService);
        await AboutUsSeeder(dataSource);
      }

      return dataSource.options; // Return the configured database options
    } catch (error) {
      logger.error('Failed to configure the database connection', error.stack);
      throw error;
    }
  },
  inject: [ConfigService],
});
