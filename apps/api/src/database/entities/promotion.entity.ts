import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    BaseEntity,
  } from 'typeorm';
  import { ApiProperty } from '@nestjs/swagger';
import { BookPromotionRelationship } from './book-promotion.entity';

@Entity('promotion')
export class Promotion extends BaseEntity {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Summer Sale' })
  @Column()
  title: string;

  @ApiProperty({ example: 'Up to 50% off on select items' })
  @Column()
  description: string;

  @ApiProperty({ example: '2024-06-01T00:00:00.000Z' })
  @Column()
  startDate: Date;

  @ApiProperty({ example: '2024-06-30T23:59:59.000Z' })
  @Column()
  expriedDate: Date;

  @ApiProperty({ example: 20 })
  @Column()
  discountPercents: number;

  @ApiProperty({ example: true })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ example: '2024-11-01T12:34:56.789Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2024-11-01T12:34:56.789Z' })
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => BookPromotionRelationship, (relation) => relation.promotion)
  bookPromotion: BookPromotionRelationship[];
}