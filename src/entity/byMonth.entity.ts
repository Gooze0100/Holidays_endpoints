import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ByMonth {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  year: number;

  @ApiProperty()
  @Column()
  country: string;

  @ApiProperty()
  @Column()
  data: string;
}
