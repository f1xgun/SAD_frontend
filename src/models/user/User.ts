import { UserRole } from "./UserRole";

export interface IUser {
    id: string;
    name: string;
    login: string;
    role: UserRole;
}

export const UserMapperFromJson = (json: { [key: string]: unknown }) => {
    return {
        id: json.id,
        name: json.name,
        login: json.login,
        role: json.role,
    };
}