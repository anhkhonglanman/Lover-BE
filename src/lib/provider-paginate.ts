import {Paginate} from "./paginate";
import {User} from "../entity/User";

export class ProviderPaginate {
    id: number;
    name: string;
    dob: string;
    sex: string;
    city: string;
    country: string;
    avatar: string;
    height: string;
    weight: string;
    hobby: string;
    desc: string;
    request: string;
    linkFB: string;
    joinDate: Date;
    price: string;
    count: string;
    ready: string;
    user: User;
    firstname: string;

    constructor(entity: any) {
        this.firstname = entity.user?.firstname
        console.log(entity)
        // this.user = user;
        this.id = entity.id;
        this.name = entity.name;
        this.dob = entity.dob;
        this.sex = entity.sex;
        this.joinDate = entity.joinDate;
        // city: string;
        //
        // country: string;
        //
        // avatar: string;
        //
        // height: string;
        //
        // weight: string;
        //
        // hobby: string;
        //
        // desc: string;
        //
        // request: string;
        //
        // linkFB: string;
        //
        //
        // price: string;
        //
        // count: string;
        // ready: string;
    }


}

export class ProviderListPaginated extends Paginate(ProviderPaginate) {
}

