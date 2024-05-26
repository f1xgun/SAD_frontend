import api from "./HttpCommon";

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

    async createGrade(options: {subjectId: string, studentId: string, evaluation: number, teacherId: string, isFinal: boolean}) {
        const { subjectId, studentId, evaluation, teacherId, isFinal } = options;
        return await api.post('/grades/', {
            "subject_id": subjectId,
            "student_id": studentId,
            "evaluation": evaluation,
            "teacher_id": teacherId,
            "is_final": isFinal,
        })
    }

    async deleteGrade(gradeId: string) {
        return await api.delete(`/grades/${gradeId}`)
    }

    async updateGrade(options: {gradeId: string, evaluation: number}) {
        const { gradeId, evaluation } = options;
        return await api.patch(`/grades/${gradeId}`, { evaluation: evaluation })
    }
}

export default new GradesApi();