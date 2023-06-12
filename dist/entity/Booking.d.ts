import { User } from "./User";
import { Provider } from "./Provider";
export declare class Booking {
    id: number;
    address: string;
    hour: string;
    startTime: Date;
    cost: string;
    user: User;
    providers: Provider;
}
