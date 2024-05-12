import { IGroup, groupFromJson } from "../group/group";
import { JSONMap } from "../json";
import { IUser, userFromJson } from "../user/User";

export interface ISubject {
    id: string;
    name: string;
}

export interface ISubjectDetails {
    id: string;
    name: string;
    teacher: IUser | null;
    groups: Array<IGroup>
}

export function subjectFromJson(json: JSONMap) : ISubjectDetails {    
    return {
        id: json.id as string,
        name: json.name as string,
        teacher: json.teacher !== undefined ? userFromJson(json.teacher as JSONMap) : null,
        groups: (json.groups as Array<JSONMap> | null)?.map((groupJson) => groupFromJson(groupJson)) ?? [],
    }
}