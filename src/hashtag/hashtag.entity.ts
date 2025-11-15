import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
