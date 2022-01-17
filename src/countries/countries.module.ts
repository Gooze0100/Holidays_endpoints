import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Countries } from 'src/entity/countries.entity';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';

@Module({
  imports: [TypeOrmModule.forFeature([Countries]), HttpModule],
  controllers: [CountriesController],
  providers: [CountriesService],
})
export class CountriesModule {}
