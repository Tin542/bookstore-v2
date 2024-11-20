import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity('post_comment')
export class PostComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: 'createdBy' })
  user: User;

  @Column()
  createdBy: number;

  @ManyToOne(() => Post, (post) => post.comment)
  @JoinColumn({ name: 'postId' })
  post: Post;

  @Column()
  postId: number;
}