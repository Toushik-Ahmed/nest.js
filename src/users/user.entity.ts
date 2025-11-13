import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from '../profile/profile.entity';
import { Tweet } from '../tweet/tweet.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 20,
    unique: true,
  })
  userName: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  password: string;

  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: ['insert'],
    // eager: true, // automatically load profile when loading user
  })
  // @JoinColumn() // creates the foreign key column as profileId in User table
  profile?: Profile; // one to one relationship with Profile entity

  @OneToMany(() => Tweet, (tweet) => tweet.user)
  tweets: Tweet[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
