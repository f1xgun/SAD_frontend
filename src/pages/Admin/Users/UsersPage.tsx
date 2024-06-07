import { useEffect, useState } from 'react';
import styles from './UsersPage.module.css';
import ScrollContainer from '../../../components/ScrollContainer/ScrollContainer';
import ElementControllers from '../../../components/ElementControllers/ElementControllers';
import { useNavigate } from 'react-router-dom';
import { JSONMap } from '../../../models/json';
import {
    IUser,
    getFullName,
    getUserFullName,
    userFromJson,
} from '../../../models/user/User';
import UserApi from '../../../api/UserApi';

const UsersPage = () => {
    const [users, setUsers] = useState<Array<IUser>>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getUsersList();
    }, []);

    const getUsersList = async () => {
        setLoading(true);
        await UserApi.getUsersInfo()
            .then((response) => {
                setUsers(
                    response.data.map((user: JSONMap) => userFromJson(user)),
                );
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    };

    const deleteUser = async (userId: string) => {
        await UserApi.deleteUser(userId).catch((err) => console.error(err));
        await getUsersList();
    };

    return loading ? (
        'Загрузка'
    ) : (
        <ScrollContainer
            emptyChildrenText="Список пользователей пуст"
            headerTitle="Пользователи"
            children={
                users.map((user) => {
                    const username = getUserFullName(user);
                    return (
                        <div key={user.id} className={styles.user}>
                            <p className={styles.userName}>{username}</p>
                            <p className={styles.userRole}>{user.role}</p>
                            <div className={styles.controllers}>
                                <ElementControllers
                                    showDeleteIcon={true}
                                    showEditIcon={true}
                                    onEdit={() =>
                                        navigate(`/users/${user.id}/edit`, {
                                            state: {
                                                user: user,
                                                userRole: user.role,
                                            },
                                        })
                                    }
                                    onDelete={() => deleteUser(user.id)}
                                />
                            </div>
                        </div>
                    );
                }) || []
            }
        />
    );
};

export default UsersPage;
