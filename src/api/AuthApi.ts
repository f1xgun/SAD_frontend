import ILoginData from "../models/auth/LoginData";
import IRegistrationData from "../models/auth/RegistrationData";
import { api } from "./HttpCommon";

class AuthApi {
    async login(data: ILoginData) {
            const response = await api.post("/login", data);

            if (response.status == 200) {
                localStorage.setItem('token', response.data.token);
            }
            return response;
    }

    async register(data: IRegistrationData) {
        return await api.post("/register", {
            "name": data.name,
            "last_name": data.lastName,
            "middle_name": data.middleName,
            "login": data.login,
            "password": data.password,
        });
    }

    logout() {
        localStorage.removeItem("token");
    }
}

export default new AuthApi();