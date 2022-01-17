import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { map, Observable } from 'rxjs';
import { ByMonth } from 'src/entity/byMonth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ByMonthService {
  constructor(
    @InjectRepository(ByMonth) private byMonthRepository: Repository<ByMonth>,
    private readonly httpService: HttpService,
  ) {}

  findAll(year: number, country: string): Observable<string> {
    return this.httpService
      .get(
        `https://kayaposoft.com/enrico/json/v2.0?action=getHolidaysForYear&year=${year}&country=${country}`,
      )
      .pipe(
        map((response) => response.data),
        map((data) => {
          const tmp = [];
          for (let i = 0; i < data.length; i++) {
            tmp.push(data[i]);
          }
          const string = JSON.stringify(tmp);
          return string;
        }),
      );
  }

  getAll(): Promise<ByMonth[]> {
    return this.byMonthRepository.find();
  }

  async getOneById(id: number): Promise<ByMonth> {
    return await this.byMonthRepository.findOneOrFail(id);
  }

  async deleteCountry(id: number): Promise<ByMonth> {
    const byMonth = await this.getOneById(id);
    return this.byMonthRepository.remove(byMonth);
  }
}
