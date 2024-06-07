import { JSONMap } from "../json";
import { UserRole } from "./UserRole";

export interface IUser {
    id: string;
    name: string;
    login: string;
    role: UserRole;
    lastName: string;
    middleName: string | null;
}

export function userFromJson(json: JSONMap) : IUser {
    return {
        id: json.id as string,
        name: json.name as string,
        login: json.login as string,
        role: userRoleFromString(json.role as string),
        lastName: json["last_name"] as string,
        middleName: json["middle_name"] as string | null,
    };
}

export function userRoleFromString(role: string) : UserRole {
    const roleMap: { [key: string]: UserRole } = {
        [UserRole.Admin.toString()]: UserRole.Admin,
        [UserRole.Teacher.toString()]: UserRole.Teacher,
        [UserRole.Student.toString()]: UserRole.Student,
    };

    return roleMap[role] || UserRole.Student;
}

export function getUserFullName(user: IUser) : string {
    let fullName = user.lastName + " " + user.name;
    if( user.middleName !== null && user.middleName !== "") {
        fullName += " " + user.middleName
    }
    return fullName;
}