import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountriesModule } from './countries/countries.module';
import { ByMonthModule } from './by-month/by-month.module';
import { ByDayModule } from './by-day/by-day.module';
import { FreeDaysModule } from './free-days/free-days.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    CountriesModule,
    ByMonthModule,
    ByDayModule,
    FreeDaysModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
