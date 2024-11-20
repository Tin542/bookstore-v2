import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

export const DatabaseProvider = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const logger = new Logger('DatabaseProvider');
    try {
      const dbConfig = {
        type: configService.get<string>('DB_TYPE') as 'postgres' | 'mysql' | 'aurora-mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE'), // Disable in production
      };
      logger.log('Attempting to connect to the database...');
      return dbConfig;
    } catch (error) {
      logger.error('Failed to configure the database connection', error.stack);
      throw error;
    }
  },
});
