import { Paginate } from "./paginate";

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
    constructor(entity:any){
       this.id= entity.id;
       this.name=entity.name;
        this.dob= entity.dob;

        this.sex=entity.sex;

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
        // joinDate: Date;
        //
        // price: string;
        //
        // count: string;
        // ready: string;
    }


}
export class ProviderListPaginated extends Paginate(ProviderPaginate) {}
