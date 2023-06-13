import { Role } from "./Role";
import { Booking } from "./Booking";
export declare class User {
    id: number;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    address: string;
    avatar: string;
    email: string;
    identityCard: string;
    role: Role;
    booking: Booking[];
    isLocked: boolean;
}
