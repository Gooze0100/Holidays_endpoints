import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ByMonth {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 2021,
    description: 'Requested year',
  })
  @Column()
  year: number;

  @ApiProperty({
    example: 'est',
    description: 'Requested country',
  })
  @Column()
  country: string;

  @ApiProperty({
    description: 'Response, what data got',
  })
  @Column()
  data: string;
}
