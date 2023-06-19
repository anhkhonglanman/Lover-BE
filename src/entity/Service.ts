import {Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Provider} from "./Provider";
import {Type} from "./Type";

@Entity()

export class Service {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: "varchar", length: 255, default: "user"})
    name: string;
    @ManyToOne(() => Type)
    type : Type
}