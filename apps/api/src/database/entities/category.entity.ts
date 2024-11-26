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

@Entity('category')
export class Category extends BaseEntity {
  @ApiProperty({
    description: 'Unique identifier for the category',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Name of the category',
    example: 'Fiction',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Indicates if the category is active',
    example: true,
    default: true,
  })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({
    description: 'Date when the category was created',
    example: '2024-11-25T12:34:56.789Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the category was last updated',
    example: '2024-11-25T15:45:12.345Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: 'Date when the category was deleted (soft delete)',
    example: null,
    nullable: true,
  })
  @DeleteDateColumn()
  deletedAt: Date;

  @ApiProperty({
    description: 'Books associated with the category',
    type: () => [Book],
  })
  @OneToMany(() => Book, (book) => book.category)
  books: Book[];
}
