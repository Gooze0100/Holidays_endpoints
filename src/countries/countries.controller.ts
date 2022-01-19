import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CountriesService } from './countries.service';

@ApiBearerAuth()
@ApiTags('countries')
@Controller('countries')
export class CountriesController {
  tmp: Array<[]> = [];
  constructor(private readonly countriesService: CountriesService) {
    this.countriesService.findAll();
  }

  @ApiOperation({ summary: 'Get all supported countries in JSON' })
  @Get()
  async findAll() {
    return this.countriesService.findAll();
  }
}
