import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "./Role";
import { Provider } from "./Provider";
import { Booking } from "./Booking";
import { Message } from "./Message";

@Entity("user")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    username: string;

    @Column({ type: "varchar", length: 255 })
    password: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    firstname: string | null;

    @Column({ type: "varchar", length: 255, nullable: true })
    lastname: string | null;

    @Column({ type: "varchar", length: 20, nullable: true })
    phoneNumber: string | null;

    @Column({ type: "varchar", length: 255, nullable: true })
    address: string | null;

    @Column({ type: "varchar", length: 255, nullable: true })
    update: string | null;

    @Column({
        type: "varchar",
        default: "https://files.playerduo.net/production/images/avatar1.png",
    })
    avatar: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    email: string | null;

    @Column({ type: "varchar", length: 255, nullable: true })
    numberCard: string | null;

    @Column({
        type: "varchar",
        nullable: true,
    })
    beforeImageCard: string | null;

    @Column({
        type: "varchar",
        nullable: true,
    })
    afterImageCard: string | null;

    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn({ name: "role_id" }) // Tên cột liên kết tới Role
    role: Role;

    @OneToMany(() => Booking, (booking) => booking.user)
    booking: Booking[];

    @OneToMany(() => Message, (massage) => massage.sender)
    messages: Message[];

    @OneToMany(() => Message, (massage) => massage.receiver)
    message: Message[];

    @Column({ default: 0 })
    isLocked: number;
}
