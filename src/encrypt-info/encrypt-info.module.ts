import { Module } from '@nestjs/common';
import { EncryptInfoService } from './encrypt-info.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EncryptInfo } from './encrypt-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EncryptInfo])],
  providers: [EncryptInfoService],
})
export class EncryptInfoModule {}
