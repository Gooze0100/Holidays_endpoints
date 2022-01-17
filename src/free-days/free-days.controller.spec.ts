import { Test, TestingModule } from '@nestjs/testing';
import { FreeDaysController } from './free-days.controller';

describe('FreeDaysController', () => {
  let controller: FreeDaysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FreeDaysController],
    }).compile();

    controller = module.get<FreeDaysController>(FreeDaysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
