import { useEffect, useState } from 'react';
import styles from './StudentGradesPage.module.css';
import ScrollContainer from '../../../components/ScrollContainer/ScrollContainer';
import { IGrade, gradeFromJson } from '../../../models/grades/Grades';
import { useLocation, useParams } from 'react-router-dom';
import ElementControllers from '../../../components/ElementControllers/ElementControllers';
import Input from '../../../components/Input/Input';
import { InputType } from '../../../components/Input/InputType';
import addIcon from '../../../assets/newIcon.svg';
import GradesApi from '../../../api/GradesApi';
import { useAppSelector } from '../../../store/store';
import { JSONMap } from '../../../models/json';

const StudentGradesPage = () => {
    const { state } = useLocation();
    const [grades, setGrades] = useState<Array<IGrade>>([]);
    const [evaluation, setEvaluation] = useState<number | null>(null);
    const params = useParams();
    const user = useAppSelector((state) => state.user.user);

    const getGrades = async () => {
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
    };

    const deleteGrade = async (gradeId: string) => {
        await GradesApi.deleteGrade(gradeId);
        await getGrades();
    };

    const addGrade = async () => {
        if (evaluation === null || user === null) return;
        await GradesApi.createGrade({
            subjectId: params.subjectId!,
            studentId: params.studentId!,
            evaluation: evaluation,
            teacherId: user.id,
            isFinal: false,
        });
        await getGrades();
    };

    useEffect(() => {
        getGrades();
    }, []);

    return (
        <ScrollContainer
            emptyChildrenText="Grades list is empty"
            headerTitle="Последние оценки"
            children={
                grades.map((grade) => {
                    return (
                        <div key={grade.id} className={styles.grade}>
                            <p>{grade.evaluation}</p>
                            <p>{grade.createdDate.toLocaleDateString()}</p>
                            <div className={styles.controllers}>
                                <ElementControllers
                                    showEditIcon={false}
                                    showDeleteIcon={true}
                                    onDelete={() => deleteGrade(grade.id)}
                                />
                            </div>
                        </div>
                    );
                }) || []
            }
            footer={
                <div className={styles.searchContainer}>
                    <Input
                        type={InputType.number}
                        placeholderText="Введите оценку"
                        onChange={(value) => setEvaluation(Number(value))}
                    />
                    <button>
                        <img src={addIcon} onClick={addGrade} />
                    </button>
                </div>
            }
        />
    );
};

export default StudentGradesPage;
