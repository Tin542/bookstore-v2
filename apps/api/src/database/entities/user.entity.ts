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
import { Post } from './post.entity';
import { Order } from './order.entity';
import { Review } from './review.entity';
import { CartItem } from './cart-item.entity';
import { Role } from './role.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  fullName: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  phoneNumber: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  refreshToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Role, (role) => role.user)
  @JoinColumn({ name: 'role' })
  role: Role;

  @OneToMany(() => Post, (post) => post.user)
  post: Post[];

  @OneToMany(() => Order, (order) => order.user)
  order: Order[];

  @OneToMany(() => Review, (review) => review.user)
  review: Review[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.user)
  cartItem: CartItem[];
}