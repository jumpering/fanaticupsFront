import { User } from "./user.model";

export interface Cup {
    id?: number;
    name: string;
    origin: string;
    description: string;
    image?: string;
    price?: number; //todo delete
    user?: User;
}