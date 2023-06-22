import { Service_provider } from './../entity/Service_provider';
import {Paginate} from "./paginate";
import {User} from "../entity/User";
import { Image } from "../entity/Image";
import { Service } from '../entity/Service';
import { Evaluate } from '../entity/Evaluate';

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
    images: Image[];
    serviceProviders: Service_provider[];
    service : Service[];
    evaluate: Evaluate[]

    constructor(entity: any, user: User, images: Image[],serviceProviders: Service_provider[], service : Service[]) {
        this.firstname = entity.user?.firstname
        // console.log(entity)
        // this.user = user ;
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
        this.user = user;
        this.images = images;
        this.serviceProviders=   serviceProviders;
        this.service=service;
        this.evaluate=evaluate;
    }
}

export class ProviderListPaginated extends Paginate(ProviderPaginate) {
}

