import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
  } from 'typeorm';
  import { ApiProperty } from '@nestjs/swagger';

@Entity('about')
export class About extends BaseEntity {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'This is a sample content for the About section.' })
  @Column()
  content: string;
}