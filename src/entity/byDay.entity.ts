import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ByDay {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '01-01-2021',
    description: 'Requested date',
  })
  @Column()
  date: string;

  @ApiProperty({
    example: 'free day',
    description: "Response of day's type",
  })
  @Column()
  status: string;
}
