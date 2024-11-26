import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

@Entity('role')
export class Role extends BaseEntity {
  @ApiProperty({
    description: 'Unique identifier for the role',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Name of the role',
    example: 'Admin',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Date and time when the role was created',
    example: '2024-11-25T12:34:56.789Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Date and time when the role was last updated',
    example: '2024-11-26T08:45:12.345Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: 'Users associated with this role',
    type: () => [User],
  })
  @OneToMany(() => User, (user) => user.role)
  user: User[];
}
