import api from "./HttpCommon";

class UserApi {
    async getUserInfo() {
        return await api.get("/users/info");
    }
}

export default new UserApi();