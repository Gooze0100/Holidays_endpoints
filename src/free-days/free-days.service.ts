import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom, map } from 'rxjs';
import { FreeDays } from 'src/entity/freeDays.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FreeDaysService {
  constructor(
    @InjectRepository(FreeDays)
    private freeDaysRepository: Repository<FreeDays>,
    private readonly httpService: HttpService,
  ) {}

  async findAll(year: number, country: string): Promise<string> {
    let cnt = 0;
    let saved = 0;
    for (let i = 1; i <= 1; i++) {
      for (let j = 1; j <= 31; j++) {
        await lastValueFrom(
          this.httpService
            .get(
              `https://kayaposoft.com/enrico/json/v2.0?action=isWorkDay&date=${j}-${i}-${year}&country=${country}`,
            )
            .pipe(
              map((response) => response.data),
              map(async (data) => {
                if (!data.error) {
                  console.log(data);
                  if (data.isWorkDay === false) {
                    // const instDate1 = `${j}-${i}-${year}`;
                    // const instDate2 = `${j + 1}-${i}-${year}`;
                    // console.log(instDate1);
                    // console.log(instDate2);
                    // if (instDate1 < instDate2) {
                    //   cnt + 1;
                    // }
                    // cnt++;
                    await lastValueFrom(
                      this.httpService
                        .get(
                          `https://kayaposoft.com/enrico/json/v2.0?action=isWorkDay&date=${
                            j + 1
                          }-${i}-${year}&country=${country}`,
                        )
                        .pipe(
                          map((response) => response.data),
                          map(async (data) => {
                            if (data.isWorkDay === false) {
                              // cnt++;
                              await lastValueFrom(
                                this.httpService
                                  .get(
                                    `https://kayaposoft.com/enrico/json/v2.0?action=isWorkDay&date=${
                                      j + 2
                                    }-${i}-${year}&country=${country}`,
                                  )
                                  .pipe(
                                    map((response) => response.data),
                                    map(async (data) => {
                                      console.log(j + 2);

                                      if (data.isWorkDay === false) {
                                        cnt++;
                                      } else {
                                        saved = cnt;
                                      }
                                    }),
                                  ),
                              );
                            }
                          }),
                        ),
                    );
                  }
                }
                const string = JSON.stringify({ maxNumberOfFree: cnt });
                // console.log(saved);
                return string;
              }),
            ),
        );
      }
    }
    return JSON.stringify(cnt);
    // let cnt = 0;
    // for (let i = 1; i <= 12; i++) {
    //   for (let j = 1; j <= 31; j++) {
    //     await lastValueFrom(
    //       this.httpService
    //         .get(
    //           `https://kayaposoft.com/enrico/json/v2.0?action=isWorkDay&date=${j}-${i}-${year}&country=${country}`,
    //         )
    //         .pipe(
    //           map((response) => response.data),
    //           map((data) => {
    //             const string = JSON.stringify(data);
    //             if (data.isWorkDay === false) {
    //               cnt++;
    //             }
    //             return string;
    //           }),
    //         ),
    //     );
    //   }
    // }
    // return JSON.stringify(cnt);
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
