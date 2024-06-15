import { api, csvApi } from "./HttpCommon";

class GradesApi {
    async getStudentGrades(options: {userId: string, isFinal: boolean}) {
        const { userId, isFinal } = options;
        return await api.get(`/grades/${userId}`, { params: {"is_final": isFinal}});
    }

    async getStudentSubjectGrades(options: {userId: string, subjectId: string, isFinal: boolean}) {
        const { userId, subjectId, isFinal } = options;
        return await api.get(`/grades/${userId}`, { params: { "subject_id": subjectId, "is_final": isFinal }})
    }

    async getGroupGradesBySubjectId(options: {groupId: string, subjectId: string, isFinalGrades: boolean | null}) {
        const { groupId, subjectId, isFinalGrades } = options;
        return await api.get('/grades/', { params: { "subject_id": subjectId, "group_id": groupId, "is_final": isFinalGrades}})
    }

    async createGrade(options: {
        subjectId: string, 
        studentId: string, 
        evaluation: number, 
        teacherId: string, 
        isFinal: boolean,
        comment: string | null,
    }) {
        const { subjectId, studentId, evaluation, teacherId, isFinal, comment } = options;
        return await api.post('/grades/', {
            "subject_id": subjectId,
            "student_id": studentId,
            "evaluation": evaluation,
            "teacher_id": teacherId,
            "is_final": isFinal,
            "comment": comment,
        })
    }

    async deleteGrade(gradeId: string) {
        return await api.delete(`/grades/${gradeId}`)
    }

    async updateGrade(options: {gradeId: string, evaluation: number, comment: string | null}) {
        const { gradeId, evaluation, comment } = options;
        return await api.patch(`/grades/${gradeId}`, { evaluation: evaluation, comment: comment, })
    }

    async getGradesReport() {
        return await csvApi.get('/grades/get_report_csv', { responseType: 'blob' })
    }
}

export default new GradesApi();