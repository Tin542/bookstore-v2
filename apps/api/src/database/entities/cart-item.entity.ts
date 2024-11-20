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
import { User } from './user.entity';
import { Book } from './book.entity';

@Entity('cart_item')
export class CartItem {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1 })
  @Column()
  bookId: number;

  @ApiProperty({ example: 1 })
  @Column()
  userId: number;

  @ApiProperty({ example: 3 })
  @Column()
  quantity: number;

  @ApiProperty({ example: 15.99, nullable: true })
  @Column('float', { nullable: true })
  price: number;

  @ApiProperty({ example: '2024-11-01T12:34:56.789Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2024-11-01T12:34:56.789Z' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.cartItem)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Book, (book) => book.cartDetail)
  @JoinColumn({ name: 'bookId' })
  book: Book;
}