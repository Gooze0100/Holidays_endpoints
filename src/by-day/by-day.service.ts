import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { map, Observable } from 'rxjs';
import { ByDay } from 'src/entity/byDay.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ByDayService {
  constructor(
    @InjectRepository(ByDay) private byDayRepository: Repository<ByDay>,
    private readonly httpService: HttpService,
  ) {}

  findAll(date: string, country: string): Observable<string> {
    return this.httpService
      .get(
        ` https://kayaposoft.com/enrico/json/v2.0?action=isPublicHoliday&date=${date}&country=${country}`,
      )
      .pipe(
        map((response) => response.data),
        map((data) => {
          if (data.isPublicHoliday === false) {
            this.httpService
              .get(
                ` https://kayaposoft.com/enrico/json/v2.0?action=isWorkDay&date=${date}&country=${country}`,
              )
              .pipe(
                map((response) => response.data),
                map((data) => {
                  if (data.isWorkDay === false) {
                    return 'free day';
                  } else {
                    const string = JSON.stringify(data);
                    return string;
                  }
                }),
              );
          } else {
            const string = JSON.stringify(data);
            return string;
          }
        }),
      );
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
