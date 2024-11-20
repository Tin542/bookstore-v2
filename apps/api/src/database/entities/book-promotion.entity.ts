import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { ApiProperty } from '@nestjs/swagger';
import { Book } from './book.entity';
import { Promotion } from './promotion.entity';

@Entity('book_promotion_relationship')
export class BookPromotionRelationship {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1 })
  @Column()
  bookId: number;

  @ApiProperty({ example: 1 })
  @Column()
  promotionId: number;

  @ApiProperty({ example: '2024-11-01T12:34:56.789Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2024-11-01T12:34:56.789Z' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Book, (book) => book.bookPromotion)
  @JoinColumn({ name: 'bookId' })
  book: Book;

  @ManyToOne(() => Promotion, (promotion) => promotion.bookPromotion)
  @JoinColumn({ name: 'promotionId' })
  promotion: Promotion;
}