import { Provider } from "./Provider";
import { Booking } from "./Booking";
export declare class User {
    id: number;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    address: string;
    email: string;
    identityCard: string;
    role: number;
    provider: Provider;
    booking: Booking[];
}
