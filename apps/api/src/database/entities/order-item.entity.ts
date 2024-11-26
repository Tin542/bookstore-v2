import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    BaseEntity,
  } from 'typeorm';
  import { ApiProperty } from '@nestjs/swagger';
import { Book } from './book.entity';
import { Order } from './order.entity';

@Entity('order_item')
export class OrderItem extends BaseEntity {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1 })
  @Column()
  orderId: number;

  @ApiProperty({ example: 1 })
  @Column()
  bookId: number;

  @ApiProperty({ example: 2 })
  @Column()
  quantity: number;

  @ApiProperty({ example: 25.99, nullable: true })
  @Column('float', { nullable: true })
  price: number;

  @ManyToOne(() => Order, (order) => order.orderDetail)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @ManyToOne(() => Book, (book) => book.orderDetail)
  @JoinColumn({ name: 'bookId' })
  book: Book;
}