import { IUser } from "../user/User";

export interface IGroup {
    id: string;
    number: string;
    students?: Array<IUser>;
}