import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { FreeDaysService } from './free-days.service';

@ApiTags('free-days')
@Controller('free-days')
export class FreeDaysController {
  constructor(private readonly freeDayService: FreeDaysService) {}

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
      'The maximum number of free(free day + holiday) days in a row, which will be by a given country and year in JSON',
  })
  @Get(':year&&:country')
  async findAll(@Param() params) {
    return this.freeDayService.findAll(params.year, `${params.country}`);
  }
}
