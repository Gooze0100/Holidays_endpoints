import { Controller, Get, Param } from '@nestjs/common';
import { ByMonthService } from './by-month.service';

@Controller('by-month')
export class ByMonthController {
  constructor(private readonly byMonthService: ByMonthService) {}

  @Get(':year&&:country')
  async findAll(@Param() params) {
    return this.byMonthService.findAll(params.year, `${params.country}`);
  }
}
