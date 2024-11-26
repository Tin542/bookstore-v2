import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    BaseEntity,
  } from 'typeorm';
  import { ApiProperty } from '@nestjs/swagger';
import { Book } from './book.entity';
import { User } from './user.entity';

@Entity('review')
export class Review extends BaseEntity {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Great book!' })
  @Column()
  content: string;

  @ApiProperty({ example: 5 })
  @Column()
  rate: number;

  @ApiProperty({ example: 1 })
  @Column()
  bookId: number;

  @ApiProperty({ example: 1 })
  @Column()
  userId: number;

  @ApiProperty({ example: '2024-11-01T12:34:56.789Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2024-11-01T12:34:56.789Z' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Book, (book) => book.review)
  @JoinColumn({ name: 'bookId' })
  book: Book;

  @ManyToOne(() => User, (user) => user.review)
  @JoinColumn({ name: 'userId' })
  user: User;
}