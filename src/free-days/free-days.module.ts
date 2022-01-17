import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FreeDays } from 'src/entity/freeDays.entity';
import { FreeDaysController } from './free-days.controller';
import { FreeDaysService } from './free-days.service';

@Module({
  imports: [TypeOrmModule.forFeature([FreeDays]), HttpModule],
  controllers: [FreeDaysController],
  providers: [FreeDaysService],
})
export class FreeDaysModule {}
