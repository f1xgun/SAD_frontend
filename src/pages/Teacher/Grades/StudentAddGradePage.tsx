import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import { InputType } from '../../../components/Input/InputType';
import GradesApi from '../../../api/GradesApi';
import { useAppSelector } from '../../../store/store';
import styles from './StudentGradesPage.module.css';
import Form from '../../../components/Form/Form';

const StudentAddGradePage = () => {
    const [evaluation, setEvaluation] = useState<number | null>(null);
    const [comment, setComment] = useState<string | null>(null);
    const [errorAddGrade, setErrorAddGrade] = useState<string | null>(null);
    const params = useParams();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user.user);
    const { state } = useLocation();

    const createGrade = async () => {
        if (user === null) return;
        if (evaluation === null) {
            setErrorAddGrade('Введите оценку!');
            return;
        }
        await GradesApi.createGrade({
            subjectId: params.subjectId!,
            studentId: params.studentId!,
            evaluation: evaluation,
            teacherId: user.id,
            isFinal: false,
            comment: comment,
        })
            .then(() => navigate('..', { relative: 'path', state: state }))
            .catch((err) => {
                console.error(err);
                setErrorAddGrade(err.response.data.error);
            });
    };

    return (
        <Form
            name={'Добавление оценки'}
            inputs={[
                <Input
                    type={InputType.number}
                    label="Оценка"
                    placeholderText="Введите оценку"
                    key="evaluation"
                    onChange={(value) => setEvaluation(Number(value))}
                />,
                <Input
                    type={InputType.text}
                    label="Комментарий"
                    placeholderText="Введите комментарий"
                    key="comment"
                    onChange={(value) => setComment(value)}
                />,
            ]}
            submitButton={
                <Button text="Добавить оценку" onClick={createGrade} />
            }
            footer={
                errorAddGrade !== null ? (
                    <div className={styles.error}>{errorAddGrade}</div>
                ) : undefined
            }
        />
    );
};

export default StudentAddGradePage;
