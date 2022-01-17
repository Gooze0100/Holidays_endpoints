import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { CountriesService } from './countries.service';

@Controller('countries')
export class CountriesController {
  tmp: Array<[]> = [];
  constructor(private readonly countriesService: CountriesService) {
    this.countriesService.findAll();
  }

  @ApiOperation({ summary: 'Get all supported countries in JSON' })
  @Get('random')
  async findAll() {
    return this.countriesService.findAll();
  }
}
