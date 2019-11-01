import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
const result = config();
if (result.error) {
  throw result.error;
}
console.log(result.parsed);

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { setStartTime } from './utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('SMTPJS-API')
    .setDescription('The api documentation of smtpjs-api')
    .setVersion('0.0.1')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  // record the startTime
  setStartTime(new Date());
  await app.listen(3000);
}
bootstrap();
