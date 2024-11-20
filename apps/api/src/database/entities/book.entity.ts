import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
import { Author } from './author.entity';
import { Category } from './category.entity';
import { CartItem } from './cart-item.entity';
import { BookPromotionRelationship } from './book-promotion.entity';
import { OrderItem } from './order-item.entity';
import { Review } from './review.entity';
@Entity('book')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column('float')
  price: number;

  @Column('float')
  rate: number;

  @Column({ default: false })
  isOutofStock: boolean;

  @Column()
  imageUrl: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  categoryId: number;

  @Column()
  authorId: number;

  @Column({ nullable: true, default: 10 })
  limitDiscount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Category, (category) => category.books)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @ManyToOne(() => Author, (author) => author.books)
  @JoinColumn({ name: 'authorId' })
  author: Author;

  @OneToMany(() => CartItem, (cartItem) => cartItem.book)
  cartDetail: CartItem[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.book)
  orderDetail: OrderItem[];

  @OneToMany(() => BookPromotionRelationship, (relation) => relation.book)
  bookPromotion: BookPromotionRelationship[];

  @OneToMany(() => Review, (review) => review.book)
  review: Review[];
}