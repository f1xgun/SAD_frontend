import { ISubject } from "../models/subject/subject";
import api from "./HttpCommon";

class SubjectsApi {
    async getSubjects() {
        return await api.get("/subjects");
    }

    async deleteSubject(subjectId: string) {
        return await api.delete(`/subjects/${subjectId}/`);
    }

    async editSubject(options: { subjectId: string, name: string}) {
        const { subjectId, name } = options;
        return await api.patch(`/subjects/${subjectId}/edit`, { "name": name })
    }

    async createSubject(name: string) {
        return await api.post(`/subjects/`, { "name": name })
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

    async getTeachersSubjectsById(teacherId: string) {
        return await api.get('/subjects/get_by_teacher_id', { params: { "teacher_id": teacherId }})
    }

    async getAvailableNewSubjectsForTeacher(teacherId: string) {
        return await api.get('/subjects/get_new_available_for_teacher', { params: {"teacher_id": teacherId }})
    }

    async updateTeacherSubjects(teacherId: string, subjects: ISubject[]) {
        return await api.patch('/subjects/edit_teacher_subjects', subjects, { params: { "teacher_id": teacherId }})
    }
}

export default new SubjectsApi();