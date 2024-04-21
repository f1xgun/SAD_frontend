import { JSONMap } from "../json";
import { UserRole } from "./UserRole";

export interface IUser {
    id: string;
    name: string;
    login: string;
    role: UserRole;
}

export function userFromJson(json: JSONMap) : IUser {
    return {
        id: json.id as string,
        name: json.name as string,
        login: json.login as string,
        role: userRoleFromString(json.role as string),
    };
}

function userRoleFromString(role: string) : UserRole {
    const roleMap: { [key: string]: UserRole } = {
        [UserRole.Admin.toString()]: UserRole.Admin,
        [UserRole.Teacher.toString()]: UserRole.Teacher,
        [UserRole.Student.toString()]: UserRole.Student,
    };

    return roleMap[role] || UserRole.Student;
}