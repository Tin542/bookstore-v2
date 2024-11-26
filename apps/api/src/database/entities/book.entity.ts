import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
  BaseEntity,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Author } from './author.entity';
import { Category } from './category.entity';
import { CartItem } from './cart-item.entity';
import { BookPromotionRelationship } from './book-promotion.entity';
import { OrderItem } from './order-item.entity';
import { Review } from './review.entity';

@Entity('book')
export class Book extends BaseEntity {
  @ApiProperty({
    description: 'Unique identifier for the book',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Title of the book',
    example: 'The Great Gatsby',
  })
  @Column()
  title: string;

  @ApiProperty({
    description: 'Short description of the book',
    example: 'A novel set in the Jazz Age that examines themes of wealth and love.',
    nullable: true,
  })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({
    description: 'Price of the book',
    example: 19.99,
    type: 'number',
  })
  @Column('float')
  price: number;

  @ApiProperty({
    description: 'Average rating of the book',
    example: 4.5,
    type: 'number',
  })
  @Column('float')
  rate: number;

  @ApiProperty({
    description: 'Indicates if the book is out of stock',
    example: false,
    default: false,
  })
  @Column({ default: false })
  isOutofStock: boolean;

  @ApiProperty({
    description: 'URL of the book cover image',
    example: 'https://example.com/image.jpg',
  })
  @Column()
  imageUrl: string;

  @ApiProperty({
    description: 'Indicates if the book is active',
    example: true,
    default: true,
  })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({
    description: 'Category ID associated with the book',
    example: 2,
  })
  @Column()
  categoryId: number;

  @ApiProperty({
    description: 'Author ID associated with the book',
    example: 3,
  })
  @Column()
  authorId: number;

  @ApiProperty({
    description: 'Limit of discount for the book',
    example: 10,
    nullable: true,
    default: 10,
  })
  @Column({ nullable: true, default: 10 })
  limitDiscount: number;

  @ApiProperty({
    description: 'Date when the book was created',
    example: '2024-11-25T12:34:56.789Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the book was last updated',
    example: '2024-11-25T15:45:12.345Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: 'Date when the book was deleted (soft delete)',
    example: null,
    nullable: true,
  })
  @DeleteDateColumn()
  deletedAt: Date;

  @ApiProperty({
    description: 'Category associated with the book',
    type: () => Category,
  })
  @ManyToOne(() => Category, (category) => category.books)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @ApiProperty({
    description: 'Author associated with the book',
    type: () => Author,
  })
  @ManyToOne(() => Author, (author) => author.books)
  @JoinColumn({ name: 'authorId' })
  author: Author;

  @ApiProperty({
    description: 'Cart details where this book is included',
    type: () => [CartItem],
  })
  @OneToMany(() => CartItem, (cartItem) => cartItem.book)
  cartDetail: CartItem[];

  @ApiProperty({
    description: 'Order details where this book is included',
    type: () => [OrderItem],
  })
  @OneToMany(() => OrderItem, (orderItem) => orderItem.book)
  orderDetail: OrderItem[];

  @ApiProperty({
    description: 'Promotions associated with the book',
    type: () => [BookPromotionRelationship],
  })
  @OneToMany(() => BookPromotionRelationship, (relation) => relation.book)
  bookPromotion: BookPromotionRelationship[];

  @ApiProperty({
    description: 'Reviews for the book',
    type: () => [Review],
  })
  @OneToMany(() => Review, (review) => review.book)
  review: Review[];
}
