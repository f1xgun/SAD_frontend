import { UserRole } from "../models/user/UserRole";
import { api } from "./HttpCommon";

class UserApi {
    async getUserInfo(userId: string) {
        return await api.get(`/users/${userId}/info`);
    }

    async getSelfUserInfo() {
        return await api.get('/users/info');
    }

    async getUsersInfo() {
        return await api.get("/users/list")
    }

    async deleteUser(userId: string) {
        return await api.delete(`/users/${userId}`)
    }

    async editUser(options: { userId: string, name: string, role: UserRole }) {
        const { userId, name, role } = options;
        return await api.patch(`/users/${userId}/edit`, { "name": name, "role": role })
    }
}

export default new UserApi();