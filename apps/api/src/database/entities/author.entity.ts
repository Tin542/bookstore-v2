import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
  BaseEntity,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Book } from './book.entity';

@Entity('author')
export class Author extends BaseEntity {
  @ApiProperty({
    description: 'Unique identifier for the author',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Name of the author',
    example: 'J.K. Rowling',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Indicates whether the author is active',
    example: true,
    default: true,
  })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({
    description: 'Date when the author was created',
    example: '2024-11-25T12:34:56.789Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the author was last updated',
    example: '2024-11-25T12:34:56.789Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: 'Date when the author was soft-deleted',
    example: '2024-11-25T12:34:56.789Z',
    required: false,
  })
  @DeleteDateColumn()
  deletedAt: Date;

  @ApiProperty({
    description: 'List of books written by the author',
    type: () => [Book], // Use a lazy function to reference the Book entity
  })
  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
