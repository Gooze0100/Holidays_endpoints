import { Test, TestingModule } from '@nestjs/testing';
import { ByDayService } from './by-day.service';

describe('ByDayService', () => {
  let service: ByDayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ByDayService],
    }).compile();

    service = module.get<ByDayService>(ByDayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
