import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Role} from "./Role";
import {Provider} from "./Provider";
import {Booking} from "./Booking";
import { Chat } from './Chat';
import {IdentityCard} from "./IdentityCard"


@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: "varchar", length: 255})
    username: string;

    @Column({type: "varchar", length: 255})
    password: string;

    @Column({type: "varchar", length: 255, nullable: true})
    firstname: string;

    @Column({type: "varchar", length: 255, nullable: true})
    lastname: string;

    @Column({type: "varchar", length: 255, nullable: true})
    gender: string;

    @Column({type: "varchar", length: 20, nullable: true})
    phoneNumber: string;

    @OneToMany(() => IdentityCard, (identityCard) => identityCard.user)
    identityCard : IdentityCard[];

    @Column({type: "varchar", length: 255, nullable: true})
    address: string;

    @Column({type: "varchar", default:"https://files.playerduo.net/production/images/avatar1.png"})
    avatar: string;

    @Column({type: "varchar", length: 255, nullable: true})
    email: string;

    @ManyToOne(() => Role, (role) => role.users)
    role: Role;
    // @OneToOne(() => Provider)
    // @JoinColumn()
    // provider: Provider;
    @OneToMany(() => Booking, (booking) => booking.user)
    booking: Booking[];

    @Column({
        default: false
    })
    isLocked: boolean;
  static findOne: any;
  sentMessages: any;
  receivedMessages: any;
}
