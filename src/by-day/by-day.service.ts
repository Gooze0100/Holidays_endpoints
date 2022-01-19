import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map, Observable } from 'rxjs';
import { ByDay } from 'src/entity/byDay.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ByDayService {
  constructor(
    @InjectRepository(ByDay) private byDayRepository: Repository<ByDay>,
    private readonly httpService: HttpService,
  ) {}

  getIsPublicHoliday(
    date: string,
    country: string,
  ): Observable<AxiosResponse<string>> {
    return this.httpService
      .get(
        `https://kayaposoft.com/enrico/json/v2.0?action=isPublicHoliday&date=${date}&country=${country}`,
      )
      .pipe(
        map((value) => value.data),
        map((data) => {
          console.log(data.json());
          return data;
        }),
      );
  }

  getIsWorkDay(
    date: string,
    country: string,
  ): Observable<AxiosResponse<string>> {
    return this.httpService
      .get(
        `https://kayaposoft.com/enrico/json/v2.0?action=isWorkDay&date=${date}&country=${country}`,
      )
      .pipe(
        map((value) => value.data),
        map((data) => {
          console.log(data.json());

          return data;
        }),
      );
  }

  async findAll(date: string, country: string): Promise<string> {
    // Works but with deprecated functions ====================================================================
    // async findAll(date: string, country: string): Promise<string> {
    // const isPublicHoliday = await this.httpService
    //   .get(
    //     `https://kayaposoft.com/enrico/json/v2.0?action=isPublicHoliday&date=${date}&country=${country}`,
    //   )
    //   .toPromise();
    // console.log(isPublicHoliday.data.isPublicHoliday);
    // const isWorkDay = await this.httpService
    //   .get(
    //     `https://kayaposoft.com/enrico/json/v2.0?action=isWorkDay&date=${date}&country=${country}`,
    //   )
    //   .toPromise();
    // console.log(isWorkDay.data.isWorkDay);
    // if (isPublicHoliday.data.isPublicHoliday === true) {
    //   return JSON.stringify(isPublicHoliday.data);
    // } else if (isWorkDay.data.isWorkDay === true) {
    //   return JSON.stringify(isWorkDay.data);
    // } else {
    //   return JSON.stringify({ freeDay: true });
    // }
    // ====================================================================

    const isWorkDay = await lastValueFrom(
      this.httpService
        .get(
          `https://kayaposoft.com/enrico/json/v2.0?action=isWorkDay&date=${date}&country=${country}`,
        )
        .pipe(map((data) => data.data)),
    );

    const isPublicHoliday = await lastValueFrom(
      this.httpService
        .get(
          `https://kayaposoft.com/enrico/json/v2.0?action=isPublicHoliday&date=${date}&country=${country}`,
        )
        .pipe(map((data) => data.data)),
    );

    if (isPublicHoliday.isPublicHoliday === true) {
      return JSON.stringify(isPublicHoliday);
    } else if (isWorkDay.isWorkDay === true) {
      return JSON.stringify(isWorkDay);
    } else {
      return JSON.stringify({ freeDay: true });
    }
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
