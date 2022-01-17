import { Controller, Get, Param } from '@nestjs/common';
import { ByDayService } from './by-day.service';

@Controller('by-day')
export class ByDayController {
  constructor(private readonly byDayService: ByDayService) {}

  @Get(':date&&:country')
  async findAll(@Param() params) {
    return this.byDayService.findAll(params.date, `${params.country}`);
  }
}
