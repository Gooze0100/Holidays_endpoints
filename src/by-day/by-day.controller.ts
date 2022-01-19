import { Controller, Get, Header, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ByDayService } from './by-day.service';

@ApiTags('by-day')
@Controller('by-day')
export class ByDayController {
  constructor(private readonly byDayService: ByDayService) {}

  @ApiParam({
    name: 'date',
    type: 'String',
    example: '01-01-2020',
    required: true,
  })
  @ApiParam({
    name: 'country',
    type: 'String',
    example: 'ltu',
    required: true,
  })
  @ApiOperation({
    summary: 'Specific day status(workday, free day, holiday)  in JSON',
  })
  @Get(':date&&:country')
  @Header('Content-type', 'application/json')
  async findAll(@Param() params) {
    return this.byDayService.findAll(params.date, `${params.country}`);
  }
}
