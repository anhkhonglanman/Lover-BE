import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {User} from "./User";
import {Image} from "./Image";
import {Booking} from "./Booking";
import {Service} from "./Service";
import {Status} from "./Status";
// import {Booking} from "./Booking";
@Entity()
export class Provider {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: "varchar", length: 255})
    name: string;
    @Column({type: "varchar", length: 255, nullable: true})
    dob: string;
    @Column({type: "varchar", length: 255, nullable: true})
    sex: string;
    @Column({type: "varchar", length: 255, nullable: true})
    city: string;
    @Column({type: "varchar", length: 20, nullable: true})
    country: string;
    @Column({type: "varchar", length: 255, nullable: true})
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
    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
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
    // @ManyToMany(() => Service)
    // @JoinTable()
    // services: Service[]
    @ManyToOne(() => Status)
    status : Status;
    @OneToOne(() => User)
    @JoinColumn()
    user: User;
}