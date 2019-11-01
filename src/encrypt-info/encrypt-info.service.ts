import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EncryptInfo } from './encrypt-info.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class EncryptInfoService {
  constructor(
    @InjectRepository(EncryptInfo)
    private readonly encryptInfoRepository: Repository<EncryptInfo>,
  ) {}

  async find(): Promise<EncryptInfo[]> {
    return await this.encryptInfoRepository.find();
  }

  async findByEncryptKey(encryptKey: string): Promise<EncryptInfo> {
    const info = await this.encryptInfoRepository.findOne({
      where: { encryptKey },
    });
    return info;
  }

  async create(encryptInfo: EncryptInfo): Promise<EncryptInfo> {
    // generate a uuid as a encrypted key
    encryptInfo.encryptKey = uuid();
    delete encryptInfo.id;
    return this.encryptInfoRepository.save(encryptInfo);
  }

  async update(encryptInfo: EncryptInfo): Promise<EncryptInfo> {
    return this.encryptInfoRepository.save(encryptInfo);
  }

  async remove(encryptInfo: EncryptInfo): Promise<EncryptInfo> {
    return this.encryptInfoRepository.remove(encryptInfo);
  }
}
