import { useEffect, useState } from 'react';
import styles from './StudentGradesPage.module.css';
import {
    IGrade,
    finalGrades,
    getEvaluationByValue,
    gradeFromJson,
} from '../../../models/grades/Grades';
import { useLocation, useParams } from 'react-router-dom';
import Input from '../../../components/Input/Input';
import { InputType } from '../../../components/Input/InputType';
import GradesApi from '../../../api/GradesApi';
import { JSONMap } from '../../../models/json';
import Form from '../../../components/Form/Form';
import Button from '../../../components/Button/Button';
import { useAppSelector } from '../../../store/store';

const StudentFinalGradePage = () => {
    const { state } = useLocation();
    const params = useParams();

    const [loading, setLoading] = useState<boolean>(true);
    const [evaluation, setEvaluation] = useState<string>('');
    const [grade, setGrade] = useState<IGrade | null>(null);
    const [errorEditGrade, setErrorEditGrade] = useState<string | null>(null);
    const user = useAppSelector((state) => state.user.user);

    const changeFinalGrade = async () => {
        if (grade === null) {
            await GradesApi.createGrade({
                subjectId: params.subjectId!,
                studentId: state.student.id!,
                evaluation: getEvaluationByValue(evaluation)!,
                teacherId: user!.id,
                isFinal: true,
            });
        } else {
            await GradesApi.updateGrade({
                gradeId: grade.id,
                evaluation: getEvaluationByValue(evaluation)!,
            }).catch((err) => setErrorEditGrade(err));
        }
        await getGrade();
    };

    const getGrade = async () => {
        await GradesApi.getStudentSubjectGrades({
            userId: state.student.id,
            subjectId: params.subjectId!,
            isFinal: true,
        })
            .then((resp) => {
                const grades = resp.data.map((json: JSONMap) =>
                    gradeFromJson(json),
                );

                console.log(resp);

                if (grades.length > 0) {
                    setGrade(grades[0]);
                    setEvaluation(finalGrades[grades[0].evaluation]);
                }
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        getGrade();
    }, []);

    return loading ? (
        'Loading'
    ) : (
        <Form
            name={state.student.name}
            inputs={[
                <Input
                    type={InputType.select}
                    label="Итоговая оценка"
                    placeholderText="Итоговая оценка"
                    key="final-grade"
                    onChange={(value) => setEvaluation(value)}
                    value={evaluation}
                    options={Object.values(finalGrades)}
                />,
            ]}
            submitButton={<Button text="Изменить" onClick={changeFinalGrade} />}
            footer={
                errorEditGrade !== null ? (
                    <div className={styles.footer}>{errorEditGrade}</div>
                ) : undefined
            }
        />
    );
};

export default StudentFinalGradePage;
