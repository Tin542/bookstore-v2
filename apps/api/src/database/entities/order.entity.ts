import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
    BaseEntity,
  } from 'typeorm';
  import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { OrderItem } from './order-item.entity';

@Entity('order')
export class Order extends BaseEntity {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 150.5 })
  @Column('float')
  totalPrice: number;

  @ApiProperty({ enum: ['COD', 'ONLINE_BANKING'], example: 'COD' })
  @Column({ type: 'enum', enum: ['COD', 'ONLINE_BANKING'] })
  paymentMethod: 'COD' | 'ONLINE_BANKING';

  @ApiProperty({ example: 1 })
  @Column()
  userId: number;

  @ApiProperty({ enum: ['INIT', 'INPROGRESS', 'APPROVED', 'REJECTED', 'SHIPING', 'DONE'], example: 'INIT' })
  @Column({ type: 'enum', enum: ['INIT', 'INPROGRESS', 'APPROVED', 'REJECTED', 'SHIPING', 'DONE'] })
  status: 'INIT' | 'INPROGRESS' | 'APPROVED' | 'REJECTED' | 'SHIPING' | 'DONE';

  @ApiProperty({ example: '2024-11-01T12:34:56.789Z', nullable: true })
  @Column({ nullable: true })
  paidAt: Date;

  @ApiProperty({ example: '123 Main St', nullable: true })
  @Column({ nullable: true })
  address: string;

  @ApiProperty({ example: '123-456-7890', nullable: true })
  @Column({ nullable: true })
  phoneNumber: string;

  @ApiProperty({ example: 'John Doe', nullable: true })
  @Column({ nullable: true })
  customerName: string;

  @ApiProperty({ example: '2024-11-01T12:34:56.789Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2024-11-01T12:34:56.789Z' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.order)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderDetail: OrderItem[];
}