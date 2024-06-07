import { useEffect, useState } from 'react';
import Form from '../../../components/Form/Form';
import { InputType } from '../../../components/Input/InputType';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { useLocation, useParams } from 'react-router-dom';
import styles from './EditSubjectPage.module.css';
import {
    IUser,
    getUserFullName,
    userFromJson,
} from '../../../models/user/User';
import { IGroup } from '../../../models/group/group';
import SubjectsApi from '../../../api/SubjectsApi';
import { JSONMap } from '../../../models/json';
import { subjectFromJson } from '../../../models/subject/subject';

const EditSubjectPage: React.FC = () => {
    const { state } = useLocation();
    const [subjectName, setSubjectName] = useState<string>(state.subject.name);
    const [teacher, setTeacher] = useState<IUser | null>(state.subject.teacher);
    const [teacherName, setTeacherName] = useState<string>(
        teacher != null ? getUserFullName(teacher) : '',
    );

    const [subjectGroups, setSubjectGroups] = useState<Array<IGroup>>(
        state.subject.groups ?? [],
    );
    const [errorEditSubject, setErrorEditSubject] = useState<string | null>(
        null,
    );
    const [loading, setLoading] = useState<boolean>(true);
    const params = useParams();

    const editSubject = async () => {
        setErrorEditSubject(null);
        if (params.subjectId === undefined) return;
        await SubjectsApi.editSubject({
            subjectId: params.subjectId,
            name: subjectName,
            teacherId: teacher?.id,
        })
            .then((resp) => {
                if (resp.status === 200) {
                    setErrorEditSubject('Данные успешно обновлены');
                }
            })
            .catch((err) => {
                console.error(err);
                setErrorEditSubject(err.response.data.error);
            });
    };

    const getSubject = async () => {
        if (params.subjectId === undefined) return;
        const response = await SubjectsApi.getSubjectDetails(params.subjectId);
        if (response.status === 200) {
            const subject = subjectFromJson(response.data);
            setTeacher(subject.teacher);

            if (subject.teacher != null) {
                setTeacherName(getUserFullName(subject.teacher));
            }
        } else {
            setErrorEditSubject(response.data.error);
        }
        setLoading(false);
    };

    useEffect(() => {
        getSubject();
    }, []);

    async function getTeachersHints(
        teacherName: string,
    ): Promise<Array<JSONMap>> {
        return SubjectsApi.getAvailableTeachers(teacherName).then(
            (response) => response.data,
        );
    }

    return loading ? (
        'Загрузка'
    ) : (
        <Form
            name={'Редактирование дисциплины'}
            inputs={[
                <Input
                    type={InputType.text}
                    label="Название"
                    placeholderText="Введите новое название дисциплины"
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
                    getHintName={(user) => getUserFullName(user)}
                    onHintClick={(user) => setTeacher(user)}
                    value={teacherName}
                />,
            ]}
            submitButton={<Button text="Изменить" onClick={editSubject} />}
            footer={
                errorEditSubject !== null ? (
                    <div className={styles.footer}>{errorEditSubject}</div>
                ) : undefined
            }
        />
    );
};

export default EditSubjectPage;
