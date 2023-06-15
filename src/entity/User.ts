import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Role} from "./Role";
import {Provider} from "./Provider";
import {Booking} from "./Booking";

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
    @Column({type: "varchar", length: 20, nullable: true})
    phoneNumber: string;
    @Column({type: "varchar", length: 255, nullable: true})
    address: string;
    @Column({type: "varchar", default:"https://files.playerduo.net/production/images/avatar1.png"})
    avatar: string;
    @Column({type: "varchar", length: 255, nullable: true})
    email: string;
    @Column({type: "varchar", length: 255, nullable: true})
    identityCard: string;
    @ManyToOne(() => Role, (role) => role.users)
    role: Role;
    // @OneToOne(() => Provider)
    // @JoinColumn()
    // provider: Provider;
    @OneToMany(() => Booking, (booking) => booking.user)
    booking: Booking[];
    @Column({
        default: 0
    })
    isLocked: boolean;
}
