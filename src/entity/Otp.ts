import { Column } from "typeorm";

export class Otp {
   @Column()
    code:string
    @Column()
    expiredTime:string
    @Column()
    owner:string

}
