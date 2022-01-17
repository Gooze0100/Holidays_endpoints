import { Controller, Get, Param } from '@nestjs/common';
import { FreeDaysService } from './free-days.service';

@Controller('free-days')
export class FreeDaysController {
  constructor(private readonly freeDayService: FreeDaysService) {}

  @Get(':year&&:country')
  async findAll(@Param() params) {
    return this.freeDayService.findAll(params.year, `${params.country}`);
  }
}
