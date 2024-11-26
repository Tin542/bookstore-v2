import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity('post_comment')
export class PostComment extends BaseEntity {
  @ApiProperty({
    description: 'Unique identifier for the comment',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Content of the comment',
    example: 'This is a great post!',
  })
  @Column()
  content: string;

  @ApiProperty({
    description: 'Date and time when the comment was created',
    example: '2024-11-25T12:34:56.789Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'User who created the comment',
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: 'createdBy' })
  user: User;

  @ApiProperty({
    description: 'ID of the user who created the comment',
    example: 3,
  })
  @Column()
  createdBy: number;

  @ApiProperty({
    description: 'Post associated with the comment',
    type: () => Post,
  })
  @ManyToOne(() => Post, (post) => post.comment)
  @JoinColumn({ name: 'postId' })
  post: Post;

  @ApiProperty({
    description: 'ID of the post associated with the comment',
    example: 5,
  })
  @Column()
  postId: number;
}
