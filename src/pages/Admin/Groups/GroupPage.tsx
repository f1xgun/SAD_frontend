import { useEffect, useState } from 'react';
import GroupApi from '../../../api/GroupApi';
import { IGroup, groupFromJson } from '../../../models/group/group';
import styles from './GroupPage.module.css';
import ScrollContainer from '../../../components/ScrollContainer/ScrollContainer';
import ElementControllers from '../../../components/ElementControllers/ElementControllers';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../../components/Input/Input';
import { InputType } from '../../../components/Input/InputType';
import { IUser, getUserFullName, userFromJson } from '../../../models/user/User';
import { JSONMap } from '../../../models/json';
import Button from '../../../components/Button/Button';

const GroupPage = () => {
    const [group, setGroup] = useState<IGroup>();
    const [loading, setLoading] = useState(true);
    const [login, setLogin] = useState('');
    const [currentNewUser, setCurrentNewUser] = useState<IUser>();
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (params.groupId === undefined) {
            navigate('/');
            return;
        }
        getGroupDetails(params.groupId);
    }, [params, navigate]);

    const getGroupDetails = async (id: string) => {
        setLoading(true);
        await GroupApi.getGroupDetails(id)
            .then((response) => {
                setGroup(groupFromJson(response.data));
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    };

    async function getUserHints(login: string): Promise<Array<JSONMap>> {
        return GroupApi.getAvailableNewUsers({
            groupId: params.groupId!,
            login: login,
        }).then((response) => response.data);
    }

    const addNewUser = async () => {
        if (currentNewUser === undefined) return;

        await GroupApi.addNewUserToGroup({
            groupId: params.groupId!,
            userId: currentNewUser.id,
        });

        await getGroupDetails(params.groupId!);

        setLogin('');
        setCurrentNewUser(undefined);
    };

    const deleteUser = async (id: string) => {
        await GroupApi.deleteUserFromGroup({
            groupId: params.groupId!,
            userId: id,
        });

        await getGroupDetails(params.groupId!);
    };

    return loading || group === undefined ? (
        'Загрузка'
    ) : (
        <ScrollContainer
            headerTitle={group.number}
            emptyChildrenText="В группе нет студентов"
            children={
                group.students?.map((student) => {
                    const userName = getUserFullName(student);
                    return (
                        <div key={student.id} className={styles.student}>
                            <p className={styles.studentName}>{userName}</p>
                            <p className={styles.studentRole}>{student.role}</p>
                            <div className={styles.controllers}>
                                <ElementControllers
                                    showEditIcon={false}
                                    showDeleteIcon={true}
                                    onDelete={() => deleteUser(student.id)}
                                />
                            </div>
                        </div>
                    );
                }) || []
            }
            footer={
                <div className={styles.footer}>
                    <div className={styles.searchContainer}>
                        <Input<IUser>
                            type={InputType.text}
                            placeholderText="Введите логин нового студента"
                            onChange={(value) => setLogin(value)}
                            getHints={(login) => getUserHints(login)}
                            hintMapper={(json) => userFromJson(json)}
                            getHintName={(user) => user.name}
                            onHintClick={(user) => setCurrentNewUser(user)}
                            value={login}
                        />
                    </div>
                    {currentNewUser !== undefined && (
                        <>
                            <div className={styles.currentUserContainer}>
                                <p>Выбранный пользователь для добавления:</p>
                                <p>Логин: {currentNewUser?.login}</p>
                                <p>Фамилия: {currentNewUser?.lastName}</p>
                                <p>Имя: {currentNewUser?.name}</p>
                                {currentNewUser?.middleName != null &&
                                    currentNewUser?.middleName != '' && (
                                        <p>
                                            Отчество:{' '}
                                            {currentNewUser?.middleName}
                                        </p>
                                    )}
                            </div>
                            <Button
                                text="Добавить студента"
                                onClick={addNewUser}
                            />
                        </>
                    )}
                    <Button
                        text="Изменить номер группы"
                        onClick={() =>
                            navigate(`/groups/${params.groupId}/edit`, {
                                state: { groupNumber: group.number },
                            })
                        }
                    />
                </div>
            }
        />
    );
};

export default GroupPage;
