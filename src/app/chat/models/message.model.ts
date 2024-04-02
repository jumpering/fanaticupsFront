import { User } from "@cup/models/user.model";

export interface Message {
    id?: number;
    message: string;
    localDate: string;
    user?: User;
}