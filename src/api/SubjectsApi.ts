import api from "./HttpCommon";

class SubjectsApi {
    async getSubjects() {
        return await api.get("/subjects");
    }

    async deleteSubject(subjectId: string) {
        return await api.delete(`/subjects/${subjectId}/`);
    }

    async editSubject(options: { subjectId: string, name: string, teacherId?: string }) {
        const { subjectId, name, teacherId } = options;
        return await api.patch(`/subjects/${subjectId}/edit`, { "name": name, "teacher_id": teacherId })
    }

    async createSubject(options: { name: string, teacherId?: string}) {
        const { name, teacherId } = options;
        return await api.post(`/subjects/`, { "name": name, "teacher_id": teacherId })
    }

    async getAvailableTeachers(teacherName: string) {
        return await api.get(`/subjects/available_teachers`, { params: { "name": teacherName }})
    }

    async getSubjectDetails(subjectId: string) {
        return await api.get(`/subjects/${subjectId}/details`)
    }

    async getTeachersSubjects() {
        return await api.get('/subjects/get_by_teacher_id')
    }
}

export default new SubjectsApi();