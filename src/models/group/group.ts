import { JSONMap } from "../json";
import { ISubject, subjectFromJson } from "../subject/subject";
import { IUser, userFromJson } from "../user/User";

export interface IGroup {
    id: string;
    number: string;
    students?: Array<IUser>;
}

export interface IGroupWithSubjects {
    group: IGroup
    subjects: Array<ISubject>
}

export function groupFromJson(json: JSONMap) : IGroup {
    return {
        id: json.id as string,
        number: json.number as string,
        students: (json.users as Array<JSONMap> | null)?.map((userJson) => userFromJson(userJson)),
    }
}

export function groupWithSubjectsFromJson(json: JSONMap) : IGroupWithSubjects {
    return {
        group: groupFromJson(json.group as JSONMap),
        subjects: (json.subjects as Array<JSONMap>).map((json) => subjectFromJson(json)),
    }
}