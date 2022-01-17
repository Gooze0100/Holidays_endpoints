import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ByMonth } from 'src/entity/byMonth.entity';
import { ByMonthController } from './by-month.controller';
import { ByMonthService } from './by-month.service';

@Module({
  imports: [TypeOrmModule.forFeature([ByMonth]), HttpModule],
  controllers: [ByMonthController],
  providers: [ByMonthService],
})
export class ByMonthModule {}
