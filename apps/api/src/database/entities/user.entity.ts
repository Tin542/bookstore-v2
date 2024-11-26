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
import { Post } from './post.entity';
import { Order } from './order.entity';
import { Review } from './review.entity';
import { CartItem } from './cart-item.entity';
import { Role } from './role.entity';

@Entity('user')
export class User extends BaseEntity {
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Unique email address of the user',
    example: 'john.doe@example.com',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  @Column()
  fullName: string;

  @ApiProperty({
    description: 'Unique username of the user',
    example: 'johndoe123',
  })
  @Column({ unique: true })
  username: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'P@ssw0rd!',
  })
  @Column()
  password: string;

  @ApiProperty({
    description: 'Indicates if the user account is active',
    example: true,
    default: true,
  })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({
    description: 'Phone number of the user',
    example: '+1234567890',
  })
  @Column()
  phoneNumber: string;

  @ApiProperty({
    description: 'Address of the user',
    example: '123 Main St, Anytown, USA',
  })
  @Column()
  address: string;

  @ApiProperty({
    description: 'URL to the user’s avatar image',
    example: 'https://example.com/avatar.jpg',
    nullable: true,
  })
  @Column({ nullable: true })
  avatar: string;

  @ApiProperty({
    description: 'Refresh token for the user session',
    example: 'some-refresh-token',
    nullable: true,
  })
  @Column({ nullable: true })
  refreshToken: string;

  @ApiProperty({
    description: 'Date and time when the user was created',
    example: '2024-11-25T12:34:56.789Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Date and time when the user was last updated',
    example: '2024-11-26T08:45:12.345Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: 'Date and time when the user was deleted (soft delete)',
    example: null,
    nullable: true,
  })
  @DeleteDateColumn()
  deletedAt: Date | null;

  @ApiProperty({
    description: 'Role associated with the user',
    type: () => Role,
  })
  @ManyToOne(() => Role, (role) => role.user)
  @JoinColumn({ name: 'role' })
  role: Role;

  @ApiProperty({
    description: 'Posts created by the user',
    type: () => [Post],
  })
  @OneToMany(() => Post, (post) => post.user)
  post: Post[];

  @ApiProperty({
    description: 'Orders placed by the user',
    type: () => [Order],
  })
  @OneToMany(() => Order, (order) => order.user)
  order: Order[];

  @ApiProperty({
    description: 'Reviews written by the user',
    type: () => [Review],
  })
  @OneToMany(() => Review, (review) => review.user)
  review: Review[];

  @ApiProperty({
    description: 'Cart items added by the user',
    type: () => [CartItem],
  })
  @OneToMany(() => CartItem, (cartItem) => cartItem.user)
  cartItem: CartItem[];
  
}
