import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tweet } from '../tweet/tweet.entity';

@Entity()
export class Hashtag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    nullable: true,
    unique: true,
  })
  name: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToMany(() => Tweet, (Tweet) => Tweet.hashtags)
  tweets: Tweet[];
}
