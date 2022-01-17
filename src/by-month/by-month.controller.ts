import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ByMonthService } from './by-month.service';

@ApiTags('by-month')
@Controller('by-month')
export class ByMonthController {
  constructor(private readonly byMonthService: ByMonthService) {}

  @ApiParam({
    name: 'year',
    type: 'Number',
    example: 2020,
    required: true,
  })
  @ApiParam({
    name: 'country',
    type: 'String',
    example: 'ltu',
    required: true,
  })
  @ApiOperation({
    summary:
      'Grouped by a month holidays list for a given country and year in JSON',
  })
  @Get(':year&&:country')
  async findAll(@Param() params) {
    return this.byMonthService.findAll(params.year, `${params.country}`);
  }
}
