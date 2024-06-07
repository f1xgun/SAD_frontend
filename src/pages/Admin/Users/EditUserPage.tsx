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
    const navigate = useNavigate();
    const params = useParams();

    const editUser = async () => {
        if (params.userId === undefined) return;
        await UserApi.editUser({
            userId: params.userId,
            name: username,
            role: userRoleFromString(userRole),
        })
            .then(() => navigate('/users'))
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
                    onChange={(value) => setUserLastName(value)}
                    value={userLastName}
                />,
                <Input
                    type={InputType.text}
                    label="Имя"
                    placeholderText="Введите новое имя пользователя"
                    key="name"
                    onChange={(value) => setUsername(value)}
                    value={username}
                />,
                <Input
                    type={InputType.text}
                    label="Отчество"
                    placeholderText="Введите новое отчество пользователя"
                    key="middleName"
                    onChange={(value) => setUserMiddleName(value)}
                    value={userMiddleName}
                />,
                <Input
                    type={InputType.select}
                    label="Роль"
                    placeholderText="Выберите новую роль пользователя"
                    key="role"
                    onChange={(value) => setUserRole(value)}
                    value={userRole}
                    options={[
                        UserRole.Admin,
                        UserRole.Teacher,
                        UserRole.Student,
                    ]}
                />,
            ]}
            submitButton={<Button text="Изменить" onClick={editUser} />}
            footer={
                errorEditUser !== null ? (
                    <div className={styles.footer}>{errorEditUser}</div>
                ) : undefined
            }
        />
    );
};

export default EditUserPage;
