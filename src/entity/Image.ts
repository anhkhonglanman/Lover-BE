import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Provider} from "./Provider";

@Entity()
export class Image{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    imageURL: string;
    @ManyToOne(()=> Provider, (provider)=> provider.images)
    provider: Provider;
}