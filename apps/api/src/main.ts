import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'fatal', 'error', 'warn', 'debug'],
  });

  const port = process.env.PORT || 8000;
  const enviroment = process.env.NODE_ENV || 'development';

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API documentation for the application')
    .setVersion('1.0')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(port);
  Logger.log(`🚀 Application is running with enviroment: ${enviroment}`)
  Logger.log(`🚀 Application is running on port: ${port}`);
}
bootstrap();
