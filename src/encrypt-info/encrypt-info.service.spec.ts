import { Test, TestingModule } from '@nestjs/testing';
import { EncryptInfoService } from './encrypt-info.service';

describe('EncryptInfoService', () => {
  let service: EncryptInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncryptInfoService],
    }).compile();

    service = module.get<EncryptInfoService>(EncryptInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
