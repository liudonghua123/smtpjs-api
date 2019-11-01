import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EncryptInfoService } from './encrypt-info/encrypt-info.service';
import { EncryptInfoModule } from './encrypt-info/encrypt-info.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EncryptInfo } from './encrypt-info/encrypt-info.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.db',
      synchronize: true,
      logging: true,
      entities: [EncryptInfo],
    }),
    TypeOrmModule.forFeature([EncryptInfo]),
    EncryptInfoModule,
  ],
  controllers: [AppController],
  providers: [AppService, EncryptInfoService],
})
export class AppModule {}
