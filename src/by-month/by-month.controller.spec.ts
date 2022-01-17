import { Test, TestingModule } from '@nestjs/testing';
import { ByMonthController } from './by-month.controller';

describe('ByMonthController', () => {
  let controller: ByMonthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ByMonthController],
    }).compile();

    controller = module.get<ByMonthController>(ByMonthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
