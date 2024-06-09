import { useState } from 'react';
import Form from '../../../components/Form/Form';
import { InputType } from '../../../components/Input/InputType';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './EditUserPage.module.css';
import UserApi from '../../../api/UserApi';
import { userRoleFromString } from '../../../models/user/User';
import { UserRole } from '../../../models/user/UserRole';
import EditTeacherSection from './EditTeacherSection';
import { ISubject } from '../../../models/subject/subject';
import SubjectsApi from '../../../api/SubjectsApi';

const EditUserPage: React.FC = () => {
    const { state } = useLocation();
    const [username, setUsername] = useState<string>(state.user.name);
    const [userLastName, setUserLastName] = useState<string>(
        state.user.lastName,
    );
    const [userMiddleName, setUserMiddleName] = useState<string>(
        state.user.middleName ?? '',
    );
    const [userRole, setUserRole] = useState<string>(state.userRole);
    const [errorEditUser, setErrorEditUser] = useState<string | null>(null);
    const [teacherSubjects, setTeacherSubjects] = useState<ISubject[]>([]);

    const navigate = useNavigate();
    const params = useParams();

    const editUser = async () => {
        if (params.userId === undefined) return;
        await UserApi.editUser({
            userId: params.userId,
            name: username,
            role: userRoleFromString(userRole),
        });
    };

    const saveTeacherSubjects = async () => {
        if (userRole !== UserRole.Teacher) return;
        await SubjectsApi.updateTeacherSubjects(state.user.id, teacherSubjects);
    };

    const saveChanges = async () => {
        await Promise.all([editUser(), saveTeacherSubjects()])
            .then(() => navigate('/users', { replace: true }))
            .catch((err) => {
                console.error(err);
                setErrorEditUser(err.response.data.error);
            });
    };

    return (
        <Form
            name={'Редактирование пользователя'}
            inputs={[
                <Input
                    type={InputType.text}
                    label="Фамилия"
                    placeholderText="Введите новую фамилию пользователя"
                    key="lastName"
                    onChange={setUserLastName}
                    value={userLastName}
                />,
                <Input
                    type={InputType.text}
                    label="Имя"
                    placeholderText="Введите новое имя пользователя"
                    key="name"
                    onChange={setUsername}
                    value={username}
                />,
                <Input
                    type={InputType.text}
                    label="Отчество"
                    placeholderText="Введите новое отчество пользователя"
                    key="middleName"
                    onChange={setUserMiddleName}
                    value={userMiddleName}
                />,
                <Input
                    type={InputType.select}
                    label="Роль"
                    placeholderText="Выберите новую роль пользователя"
                    key="role"
                    onChange={setUserRole}
                    value={userRole}
                    options={[
                        UserRole.Admin,
                        UserRole.Teacher,
                        UserRole.Student,
                    ]}
                />,
            ]}
            inputs2={
                userRole === UserRole.Teacher
                    ? [
                          <EditTeacherSection
                              teacherId={state.user.id}
                              onSave={setTeacherSubjects}
                          />,
                      ]
                    : []
            }
            submitButton={
                <Button text="Сохранить все изменения" onClick={saveChanges} />
            }
            footer={
                errorEditUser !== null ? (
                    <div className={styles.footer}>{errorEditUser}</div>
                ) : undefined
            }
        />
    );
};

export default EditUserPage;
