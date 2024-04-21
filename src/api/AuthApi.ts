import ILoginData from "../models/auth/LoginData";
import IRegistrationData from "../models/auth/RegistrationData";
import api from "./HttpCommon";

class AuthApi {
    async login(data: ILoginData) {
        try {
            const response = await api.post("/login", data);

            if (response.status == 200) {
                localStorage.setItem('token', response.data.token);
            }
            return response;
        } catch (err) {
            console.error(err);
        }
    }

    async register(data: IRegistrationData) {
        return await api.post("/register", data);
    }

    logout() {
        localStorage.removeItem("token");
    }
}

export default new AuthApi();