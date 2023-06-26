// message.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  content: string;

  // Định nghĩa quan hệ Many-to-One với User
  @ManyToOne(() => User, user => user.messages)
  sender: User;

  @ManyToOne(() => User, user => user.message)
  receiver: User;
}
