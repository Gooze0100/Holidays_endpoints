import { Controller, Get } from '@nestjs/common';
import { map } from 'rxjs';
import { Countries } from 'src/entity/countries.entity';
import { CountriesService } from './countries.service';

@Controller('countries')
export class CountriesController {
  tmp: Array<[]> = [];
  constructor(private readonly countriesService: CountriesService) {
    this.countriesService.findAll();
  }

  @Get()
  //   async createCountry(): Promise<Countries> {
  async createCountry(): Promise<Countries[]> {
    // return this.countriesService.createCountry('Lithuania');
    // const country = await this.countriesService.createCountry('Ukraine');

    return this.countriesService.getAll();
  }

  @Get('find')
  async findAll() {
    // return this.countriesService.findAll().pipe(map(data)=>{
    //   return data
    // });
    return this.countriesService.findAll();
  }
}
