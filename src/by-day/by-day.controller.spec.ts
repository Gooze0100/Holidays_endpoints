import { Test, TestingModule } from '@nestjs/testing';
import { ByDayController } from './by-day.controller';

describe('ByDayController', () => {
  let controller: ByDayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ByDayController],
    }).compile();

    controller = module.get<ByDayController>(ByDayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
