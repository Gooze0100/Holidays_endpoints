import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { map, Observable } from 'rxjs';
import { FreeDays } from 'src/entity/freeDays.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FreeDaysService {
  constructor(
    @InjectRepository(FreeDays)
    private freeDaysRepository: Repository<FreeDays>,
    private readonly httpService: HttpService,
  ) {}

  findAll(year: number, country: string): Observable<string> {
    return this.httpService
      .get(
        `https://kayaposoft.com/enrico/json/v2.0?action=isWorkDay&date=01-01-${year}&country=${country}`,
      )
      .pipe(
        map((response) => response.data),
        map((data) => {
          const string = JSON.stringify(data);

          return string;
        }),
      );
  }

  getAll(): Promise<FreeDays[]> {
    return this.freeDaysRepository.find();
  }

  async getOneById(id: number): Promise<FreeDays> {
    return await this.freeDaysRepository.findOneOrFail(id);
  }

  async deleteCountry(id: number): Promise<FreeDays> {
    const freeDays = await this.getOneById(id);
    return this.freeDaysRepository.remove(freeDays);
  }
}
