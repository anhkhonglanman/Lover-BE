import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Provider} from "./Provider";

@Entity()

export class Service {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: "varchar", length: 255, default: null})
    type: string;
    @Column({type: "varchar", length: 255, default: "user"})
    name: string;
    @ManyToOne(() => Provider)
    provider : Provider
}