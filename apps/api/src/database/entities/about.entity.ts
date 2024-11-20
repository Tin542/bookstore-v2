import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
  } from 'typeorm';
  import { ApiProperty } from '@nestjs/swagger';

@Entity('about')
export class About {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'This is a sample content for the About section.' })
  @Column()
  content: string;
}