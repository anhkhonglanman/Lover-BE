import { User } from "./User";
import { Image } from "./Image";
import { Booking } from "./Booking";
import { Service } from "./Service";
import { Status } from "./Status";
export declare class Provider {
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
    booking: Booking[];
    images: Image[];
    service: Service;
    status: Status;
    user: User;
}
