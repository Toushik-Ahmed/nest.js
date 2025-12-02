import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Hashtag } from '../hashtag/hashtag.entity';
import { User } from '../users/user.entity';

@Entity()
export class Tweet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    nullable: false,
  })
  text: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  image?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.tweets, { eager: true }) // when creating many to many relationships the foreign key is stored in the entity where ManyToOne is defined
  //here userId will be stored in Tweet table no need to use JoinColumn
  user: User;

  @ManyToMany(() => Hashtag, (hastag) => hastag.tweets, { eager: true })
  @JoinTable() //this decorator is used to specify that this side will own the relationship and will contain the junction table
  hashtags: Hashtag[];
}
