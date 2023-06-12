import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Image} from "./Image";
import {Booking} from "./Booking";
import {Service} from "./Service";
// import {Booking} from "./Booking";
@Entity()
export class Provider {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: "varchar", length: 255})
    name: string;
    @Column({type: "date"})
    dob: Date;
    @Column({type: "varchar", length: 255, nullable: false})
    sex: string;
    @Column({type: "varchar", length: 255, nullable: false})
    city: string;
    @Column({type: "varchar", length: 20, nullable: false})
    country: string;
    @Column({type: "varchar", length: 255, nullable: false})
    avatar: string;
    @Column({type: "varchar", length: 255, nullable: true})
    height: string;
    @Column({type: "varchar", length: 255, nullable: true})
    weight: string;
    @Column({type: "varchar", length: 255, nullable: true})
    hobby: string;
    @Column({type: "varchar", length: 255, nullable: true})
    desc: string;
    @Column({type: "varchar", length: 255, nullable: true})
    request: string;
    @Column({type: "varchar", length: 255, nullable: true})
    linkFB: string;
    @Column({type: "date"})
    joinDate: Date;
    @Column({type: "varchar", length: 255, default: "70000"})
    price: string;
    @Column({type: "varchar", length: 255, nullable: true})
    count: string;
    // sẵn sàng cho thuê
    @Column({type: "varchar", default:"on"})
    ready: string;
    @OneToMany(() => Booking, (booking) => booking.providers)
    booking: Booking[];
    @OneToMany(() => Image, (image) => image.provider)
    images : Image[];
    @ManyToOne(() => Service)
    service : Service;
    @OneToOne(() => User)
    @JoinColumn()
    user: User;
}