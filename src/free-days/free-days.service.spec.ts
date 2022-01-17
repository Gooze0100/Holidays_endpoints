import { Test, TestingModule } from '@nestjs/testing';
import { FreeDaysService } from './free-days.service';

describe('FreeDaysService', () => {
  let service: FreeDaysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FreeDaysService],
    }).compile();

    service = module.get<FreeDaysService>(FreeDaysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
