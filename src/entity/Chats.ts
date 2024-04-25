import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Entity()
export class Chats {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message: string;

  @OneToOne(() => User, (user) => user.id)
  sender: User;

  @OneToOne(() => User, (user) => user.id)
  reciever: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
