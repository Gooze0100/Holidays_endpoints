import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ByDay } from 'src/entity/byDay.entity';
import { ByDayController } from './by-day.controller';
import { ByDayService } from './by-day.service';

@Module({
  imports: [TypeOrmModule.forFeature([ByDay]), HttpModule],
  controllers: [ByDayController],
  providers: [ByDayService],
})
export class ByDayModule {}
