import { Test, TestingModule } from '@nestjs/testing';
import { ByMonthService } from './by-month.service';

describe('ByMonthService', () => {
  let service: ByMonthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ByMonthService],
    }).compile();

    service = module.get<ByMonthService>(ByMonthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
