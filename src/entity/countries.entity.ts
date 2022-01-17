import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Countries {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  countries: string;
}
