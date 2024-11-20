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
import { User } from './user.entity';
import { PostImage } from './post-image.entity';
import { PostComment } from './post-comment.entity';

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.post)
  @JoinColumn({ name: 'createdBy' })
  user: User;

  @Column({ nullable: true })
  createdBy: number;

  @OneToMany(() => PostImage, (postImage) => postImage.post)
  image: PostImage[];

  @OneToMany(() => PostComment, (comment) => comment.post)
  comment: PostComment[];
}