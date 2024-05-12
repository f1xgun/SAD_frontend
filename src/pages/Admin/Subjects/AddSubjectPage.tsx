import { useState } from 'react';
import Form from '../../../components/Form/Form';
import { InputType } from '../../../components/Input/InputType';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import styles from './EditSubjectPage.module.css';
import { IUser, userFromJson } from '../../../models/user/User';
import SubjectsApi from '../../../api/SubjectsApi';
import { JSONMap } from '../../../models/json';

const CreateSubjectPage: React.FC = () => {
    const [subjectName, setSubjectName] = useState<string>('');
    const [teacher, setTeacher] = useState<IUser | null>(null);
    const [teacherName, setTeacherName] = useState<string>('');
    const [errorCreateSubject, setErrorCreateSubject] = useState<string | null>(
        null,
    );
    const navigate = useNavigate();

    const createSubject = async () => {
        setErrorCreateSubject(null);
        await SubjectsApi.createSubject({
            name: subjectName,
            teacherId: teacher?.id,
        })
            .then(() => navigate('/subjects'))
            .catch((err) => {
                console.error(err);
                setErrorCreateSubject(err.response.data.error);
            });
    };

    async function getTeachersHints(
        teacherName: string,
    ): Promise<Array<JSONMap>> {
        return SubjectsApi.getAvailableTeachers(teacherName).then(
            (response) => response.data,
        );
    }

    return (
        <Form
            name={'Создание дисциплины'}
            inputs={[
                <Input
                    type={InputType.text}
                    label="Название"
                    placeholderText="Введите название дисциплины"
                    key="name"
                    onChange={(value) => setSubjectName(value)}
                    value={subjectName}
                />,
                <Input<IUser>
                    type={InputType.text}
                    label="Прикрепленный преподаватель"
                    placeholderText="Введите имя преподавателя"
                    key="teacherName"
                    onChange={(value) => setTeacherName(value)}
                    getHints={(name) => getTeachersHints(name)}
                    hintMapper={(json) => userFromJson(json)}
                    getHintName={(user) => user.name}
                    onHintClick={(user) => setTeacher(user)}
                    value={teacherName}
                />,
            ]}
            submitButton={<Button text="Создать" onClick={createSubject} />}
            footer={
                errorCreateSubject !== null ? (
                    <div className={styles.footer}>{errorCreateSubject}</div>
                ) : undefined
            }
        />
    );
};

export default CreateSubjectPage;
