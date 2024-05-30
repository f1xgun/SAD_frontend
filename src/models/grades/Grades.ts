import { JSONMap } from "../json";
import { IUser, userFromJson } from "../user/User";

export interface IGrade {
    id: string;
    subjectName: string;
    createdDate: Date;
    evaluation: number;
    isFinal: boolean;
    comment?: string;
}

export interface IUserSubjectGrades {
    student: IUser;
    grades: Array<IGrade>;
}

export function gradeFromJson(json: JSONMap) : IGrade {
    return {
        id: json.id as string,
        subjectName: json["subject_name"] as string,
        createdDate: new Date(json["created_at"] as string),
        evaluation: json.evaluation as number,
        isFinal: json.isFinal as boolean | null ?? false,
    }
}

export function userSubjectGradesFromJson(json: JSONMap) : IUserSubjectGrades {
    return {
        student: userFromJson(json.student as JSONMap),
        grades: (json.grades as Array<JSONMap>).map((json) => gradeFromJson(json)),
    }
}

export const finalGrades: { [key: number]: string } = {
    0: "Не зачтено",
    1: "Зачтено",
    2: "Неудовлетворительно",
    3: "Удовлетворительно",
    4: "Хорошо",
    5: "Отлично",
}

export function getEvaluationByValue(value: string): number | undefined {
    return Number(Object.keys(finalGrades).find(key => finalGrades[parseInt(key)] === value));
}