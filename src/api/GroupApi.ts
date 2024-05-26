import api from "./HttpCommon";

class GroupApi {
    async getGroups() {
        return await api.get("/groups");
    }

    async getGroupDetails(groupId: string) {
        return await api.get(`/groups/${groupId}/details`)
    }

    async getAvailableNewUsers(options: { groupId: string; login: string }) {
        const { groupId, login } = options;
        return await api.get(`/groups/${groupId}/available_new_users`, { params: { login: login }})
    }

    async addNewUserToGroup(options: { groupId: string, userId: string }) {
        const { groupId, userId } = options;
        return await api.post(`/groups/${groupId}/users/`, { "user_id": userId})
    }

    async deleteUserFromGroup(options: { groupId: string, userId: string }) {
        const { groupId, userId } = options;
        return await api.delete(`/groups/${groupId}/users/${userId}`)
    }

    async deleteGroup(groupId: string) {
        return await api.delete(`/groups/${groupId}/`)
    }

    async createGroup(number: string) {
        return await api.post(`/groups/`, { "number": number })
    }

    async editGroup(options : { groupId: string, number: string }) {
        const { groupId, number } = options;
        return await api.patch(`/groups/${groupId}/`, { "number" : number})
    }

    // TODO: remove teacherId, get id from token
    async getTeacherGroupsWithSubjects(teacherId: string) {
        return await api.get(`/groups/teacher`, { params: { "teacher_id": teacherId }})
    }
}

export default new GroupApi();