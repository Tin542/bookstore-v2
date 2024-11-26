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
import { Post } from './post.entity';

@Entity('post_image')
export class PostImage extends BaseEntity {
  @ApiProperty({
    description: 'Unique identifier for the image',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Link to the image',
    example: 'https://example.com/image.jpg',
  })
  @Column()
  link: string;

  @ApiProperty({
    description: 'Post associated with this image',
    type: () => Post,
  })
  @ManyToOne(() => Post, (post) => post.image)
  @JoinColumn({ name: 'postId' })
  post: Post;

  @ApiProperty({
    description: 'ID of the post associated with this image',
    example: 5,
  })
  @Column()
  postId: number;

  @ApiProperty({
    description: 'Date and time when the image was added',
    example: '2024-11-25T12:34:56.789Z',
  })
  @CreateDateColumn()
  createdAt: Date;
}
