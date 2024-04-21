import { JSONMap } from "../json";
import { IUser, userFromJson } from "../user/User";

export interface IGroup {
    id: string;
    number: string;
    students?: Array<IUser>;
}

export function groupFromJson(json: JSONMap) : IGroup {
    return {
        id: json.id as string,
        number: json.number as string,
        students: (json.users as Array<JSONMap> | undefined)?.map((userJson) => userFromJson(userJson)),
    }
}