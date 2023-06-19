import { User } from './User';
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class IdentityCard{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: "varchar", length: 255, nullable: true})
    identityCardURL: string;
    @ManyToOne(()=> User, (user)=> user.identityCard)
    user: User;
}