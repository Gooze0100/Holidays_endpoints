import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { map, Observable } from 'rxjs';
import { Countries } from 'src/entity/countries.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Countries)
    private countriesRepository: Repository<Countries>,
    private readonly httpService: HttpService,
  ) {}

  findAll(): Observable<string> {
    return this.httpService
      .get(
        'https://kayaposoft.com/enrico/json/v2.0?action=getSupportedCountries',
      )
      .pipe(
        map((response) => response.data),
        map((data) => {
          const tmp = [];
          for (let i = 0; i < data.length; i++) {
            tmp.push(data[i].fullName);
          }
          const string = JSON.stringify(tmp);
          return string;
        }),
      );
  }

  getAll(): Promise<Countries[]> {
    return this.countriesRepository.find(); // select * from countries
  }

  async getOneById(id: number): Promise<Countries> {
    return await this.countriesRepository.findOneOrFail(id); // select * from user where user id = id
  }

  createCountry(countries: string): Promise<Countries> {
    const newCountry = this.countriesRepository.create({ countries }); // const newCountry = new Country() newCountry.countries=countries
    return this.countriesRepository.save(newCountry); // insert
  }

  async updateCountry(id: number, countries: string): Promise<Countries> {
    const country = await this.getOneById(id);
    country.countries = countries;
    return this.countriesRepository.save(country); // update
  }

  async deleteCountry(id: number): Promise<Countries> {
    const country = await this.getOneById(id);
    return this.countriesRepository.remove(country);
  }

  //   customQuery():any {
  //     return this.countriesRepository.createQueryBuilder('country').select('countries').where().orderBy()
  //   }
}
