import api from "./HttpCommon";

class GradesApi {
    async getStudentGrades(userId: string) {
        return await api.get("/grades/" + userId);
    }
}

export default new GradesApi();