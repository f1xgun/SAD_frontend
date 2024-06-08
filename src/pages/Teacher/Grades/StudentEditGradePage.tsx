import { useState } from 'react';
import Form from '../../../components/Form/Form';
import { InputType } from '../../../components/Input/InputType';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './StudentGradesPage.module.css';
import GradesApi from '../../../api/GradesApi';
import { IGrade } from '../../../models/grades/Grades';
import { IUser, getUserFullName } from '../../../models/user/User';

const StudentEditGradePage: React.FC = () => {
    const { state } = useLocation();

    const grade: IGrade = state.grade;
    const student: IUser = state.student;
    const [evaluation, setEvaluation] = useState<number>(grade.evaluation);
    const [comment, setComment] = useState<string>(grade.comment ?? '');
    const [errorEditGrade, setErrorEditGrade] = useState<string | null>(null);
    const navigate = useNavigate();

    const editGrade = async () => {
        if (grade === undefined) return;
        await GradesApi.updateGrade({
            evaluation: evaluation,
            comment: comment,
            gradeId: grade.id,
        })
            .then(() =>
                navigate('../../../', { relative: 'path', state: state }),
            )
            .catch((err) => {
                console.error(err);
                setErrorEditGrade(err.response.data.error);
            });
    };

    return (
        <Form
            name={`Редактирование оценки ${getUserFullName(student)}`}
            inputs={[
                <Input
                    type={InputType.number}
                    label="Оценка"
                    placeholderText="Введите новое значение оценки"
                    key="evaluation"
                    onChange={(value) => setEvaluation(Number(value))}
                    value={evaluation.toString()}
                />,
                <Input
                    type={InputType.text}
                    label="Комментарий"
                    placeholderText="Введите комментарий для оценки"
                    key="role"
                    onChange={(value) => setComment(value)}
                    value={comment}
                />,
            ]}
            submitButton={<Button text="Изменить" onClick={editGrade} />}
            footer={
                errorEditGrade !== null ? (
                    <div className={styles.footer}>{errorEditGrade}</div>
                ) : undefined
            }
        />
    );
};

export default StudentEditGradePage;
