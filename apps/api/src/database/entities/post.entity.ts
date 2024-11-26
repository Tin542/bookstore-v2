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
import { User } from './user.entity';
import { PostImage } from './post-image.entity';
import { PostComment } from './post-comment.entity';

@Entity('post')
export class Post extends BaseEntity {
  @ApiProperty({
    description: 'Unique identifier for the post',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Content of the post',
    example: 'This is a sample post content.',
  })
  @Column()
  content: string;

  @ApiProperty({
    description: 'Date and time when the post was created',
    example: '2024-11-25T12:34:56.789Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Date and time when the post was last updated',
    example: '2024-11-26T08:45:12.345Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: 'Date and time when the post was deleted (soft delete)',
    example: null,
    nullable: true,
  })
  @DeleteDateColumn()
  deletedAt: Date;

  @ApiProperty({
    description: 'User who created the post',
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.post)
  @JoinColumn({ name: 'createdBy' })
  user: User;

  @ApiProperty({
    description: 'ID of the user who created the post',
    example: 3,
    nullable: true,
  })
  @Column({ nullable: true })
  createdBy: number;

  @ApiProperty({
    description: 'Images associated with the post',
    type: () => [PostImage],
  })
  @OneToMany(() => PostImage, (postImage) => postImage.post)
  image: PostImage[];

  @ApiProperty({
    description: 'Comments associated with the post',
    type: () => [PostComment],
  })
  @OneToMany(() => PostComment, (comment) => comment.post)
  comment: PostComment[];
}
