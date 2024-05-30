import { useCallback, useEffect, useState } from 'react';
import styles from './StudentGradesPage.module.css';
import ScrollContainer from '../../../components/ScrollContainer/ScrollContainer';
import { IGrade, gradeFromJson } from '../../../models/grades/Grades';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ElementControllers from '../../../components/ElementControllers/ElementControllers';
import GradesApi from '../../../api/GradesApi';
import { JSONMap } from '../../../models/json';
import Button from '../../../components/Button/Button';

const StudentGradesPage = () => {
    const { state } = useLocation();
    const [grades, setGrades] = useState<Array<IGrade>>([]);
    const params = useParams();
    const navigate = useNavigate();

    const getGrades = useCallback(async () => {
        await GradesApi.getStudentSubjectGrades({
            userId: state.student.id,
            subjectId: params.subjectId!,
            isFinal: false,
        }).then((resp) => {
            const grades = resp.data.map((json: JSONMap) =>
                gradeFromJson(json),
            );

            setGrades(grades);
        });
    }, [params.subjectId, state.student]);

    const deleteGrade = async (gradeId: string) => {
        await GradesApi.deleteGrade(gradeId);
        await getGrades();
    };

    useEffect(() => {
        getGrades();
    }, [getGrades]);

    return (
        <ScrollContainer
            emptyChildrenText="Список оценок пуст"
            headerTitle="Последние оценки"
            children={
                grades.map((grade) => {
                    return (
                        <div key={grade.id} className={styles.grade}>
                            <p className={styles.evaluation}>
                                {grade.evaluation}
                            </p>
                            <p className={styles.date}>
                                {grade.createdDate.toLocaleDateString()}
                            </p>
                            <div className={styles.controllers}>
                                <ElementControllers
                                    showEditIcon={true}
                                    showDeleteIcon={true}
                                    onDelete={() => deleteGrade(grade.id)}
                                    onEdit={() =>
                                        navigate(`./grade/${grade.id}/edit`, {
                                            state: {
                                                ...state,
                                                grade: grade,
                                            },
                                            relative: 'path',
                                        })
                                    }
                                />
                            </div>
                        </div>
                    );
                }) || []
            }
            footer={
                <Button
                    text="Добавить оценку"
                    onClick={() =>
                        navigate('./add_grade', {
                            state: state,
                            relative: 'path',
                        })
                    }
                />
            }
        />
    );
};

export default StudentGradesPage;
