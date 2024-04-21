import { JSONMap } from "../json";

export interface IGrade {
    id: string;
    subjectName: string;
    // teacherName: string;
    createdDate: Date;
    evaluation: number;
}

export function gradeFromJson(json: JSONMap) : IGrade {
    return {
        id: json.id as string,
        subjectName: json["subject_name"] as string,
        createdDate: new Date(json["created_at"] as string),
        evaluation: json.evaluation as number,
    }
}