import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from 'rxjs';
import { ByDay } from 'src/entity/byDay.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ByDayService {
  constructor(
    @InjectRepository(ByDay) private byDayRepository: Repository<ByDay>,
    private readonly httpService: HttpService,
  ) {}

  // findAll(date: string, country: string): Observable<string> {
  findAll(date: string, country: string): Subscription {
    return this.httpService
      .get(
        `https://kayaposoft.com/enrico/json/v2.0?action=isPublicHoliday&date=${date}&country=${country}`,
      )
      .subscribe((value) => {
        if (value.data.isPublicHoliday === true) {
          console.log(value.data);
          return JSON.stringify(value.data);
        } else {
          return this.httpService
            .get(
              `https://kayaposoft.com/enrico/json/v2.0?action=isWorkDay&date=${date}&country=${country}`,
            )
            .subscribe((value) => {
              if (value.data.isWorkDay === true) {
                console.log(value.data);
                return JSON.stringify(value.data);
              } else {
                console.log('free day');
                const string = JSON.stringify({ freeDay: 'free day' });
                return string;
              }
            });
        }
      });
  }

  getAll(): Promise<ByDay[]> {
    return this.byDayRepository.find();
  }

  async getOneById(id: number): Promise<ByDay> {
    return await this.byDayRepository.findOneOrFail(id);
  }

  async deleteCountry(id: number): Promise<ByDay> {
    const byDay = await this.getOneById(id);
    return this.byDayRepository.remove(byDay);
  }
}
