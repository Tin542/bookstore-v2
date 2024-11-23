import { Module } from '@nestjs/common';
import { DatabaseProvider } from './database/database.provider';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `env/.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true, // Makes ConfigModule available globally
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_SYNCHRONIZE: Joi.boolean().default(false),
        DB_LOGGING: Joi.boolean().default(false),
        DB_DROP: Joi.boolean().default(false),
        DB_SEED: Joi.boolean().default(false),
        PORT: Joi.number().default(3000),
      }),
    }),
    DatabaseProvider,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
