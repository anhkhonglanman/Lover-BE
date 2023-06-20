import {Paginate} from "./paginate";
import {ProviderPaginate} from "./provider-paginate";
import {User} from "../entity/User";
import {Provider} from "../entity/Provider";

export class BookingPaginate{
    id: number;
    address: string;
    hour: string;
    startTime: Date;
    cost: string;
    user: User;
    providers: Provider

    constructor(entity: any) {
        this.startTime = entity.startTime
    }
}

export class BookingListPaginated extends Paginate(BookingPaginate) {
}