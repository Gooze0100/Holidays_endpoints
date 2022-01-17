import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FreeDays {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 2021,
    description: 'Requested year',
  })
  @Column()
  year: number;

  @ApiProperty({
    example: 'ltu',
    description: 'Requested country',
  })
  @Column()
  country: string;

  @ApiProperty({
    example: 8,
    description: 'Counted maximum number of free days',
  })
  @Column()
  maxDaysInRow: number;
}
