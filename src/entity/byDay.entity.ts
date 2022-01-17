import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ByDay {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  date: string;

  @ApiProperty()
  @Column()
  status: string;
}
