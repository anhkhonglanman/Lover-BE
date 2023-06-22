import { Service_provider } from './../entity/Service_provider';
import {Paginate} from "./paginate";
import {User} from "../entity/User";
import { Image } from "../entity/Image";
import { Service } from '../entity/Service';

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

    constructor(entity: any, user: User, images: Image[],serviceProviders: Service_provider[], service : Service[], ) 
    {
        this.firstname = entity.user?.firstname
        console.log(entity, 'meo meo')
        // this.user = user;
        this.id = entity.id;
        this.name = entity.name;
        this.dob = entity.dob;
        this.sex = entity.sex;
        this.joinDate = entity.joinDate;
        this.city= entity.city
        this.country= entity.country
        this.height= entity.height
        this.weight= entity.weight
        this.hobby= entity.hobby
        this.desc= entity.desc
        this.request= entity.request
        this.linkFB= entity.linkFB
        this.price= entity.price
        this.count= entity.count
        this.ready= entity.ready
        this.user = user;
        this.images = images;  
        this.serviceProviders=serviceProviders;
        this.service=service;
    }
}

export class ProviderListPaginated extends Paginate(ProviderPaginate) {
}

