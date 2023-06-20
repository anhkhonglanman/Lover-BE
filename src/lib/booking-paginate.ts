import {Paginate} from "./paginate";
import {ProviderPaginate} from "./provider-paginate";
import {User} from "../entity/User";
import {Provider} from "../entity/Provider";

export class BookingPaginate{
    id: number;
    address: string;
    hour: string;
    startTime: Date;
    status: string;
    cost: string;
    user: User;
    providers: Provider

    constructor(entity: any) {
        console.log(entity)
        this.startTime = entity.startTime
        this.status = entity.status
    }
}

export class BookingListPaginated extends Paginate(BookingPaginate) {
}