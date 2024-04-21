import { useEffect, useState } from 'react';
import GroupApi from '../../../api/GroupApi';
import { IGroup } from '../../../models/group/group';
import styles from './GroupPage.module.css';
import ScrollContainer from '../../../components/ScrollContainer/ScrollContainer';
import ElementControllers from '../../../components/ElementControllers/ElementControllers';
import { useNavigate, useParams } from 'react-router-dom';
import addIcon from '../../../assets/newIcon.svg';
import Input from '../../../components/Input/Input';
import { InputType } from '../../../components/Input/InputType';
import { IUser, UserMapperFromJson } from '../../../models/user/User';

const GroupPage = () => {
    const [group, setGroup] = useState<IGroup>();
    const [loading, setLoading] = useState(true);
    const [login, setLogin] = useState('');
    const [currentNewUser, setCurrentNewUser] = useState<IUser>();
    const [hintUsers, setHintUsers] = useState<Array<IUser>>([]);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        if (params.group_id === undefined) {
            navigate('/');
            return;
        }
        getGroupDetails(params.group_id);
    }, [params, navigate]);

    const getGroupDetails = async (id: string) => {
        await GroupApi.getGroupDetails(id)
            .then((response) => {
                setGroup({
                    id: response.data.id,
                    number: response.data.number,
                    students: response.data.users.map(
                        (student: { [key: string]: unknown }) =>
                            UserMapperFromJson(student),
                    ),
                });
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    };

    const updateHints = (login: string) => {
        if (params.group_id === undefined) return;
        GroupApi.getAvailableNewUsers({
            groupId: params.group_id,
            login: login,
        }).then((response) =>
            setHintUsers(
                response.data.map((user: { [key: string]: unknown }) =>
                    UserMapperFromJson(user),
                ),
            ),
        );
        setCurrentNewUser(undefined);
    };

    const onNewUserSelect = (user: IUser) => {
        setCurrentNewUser(user);
        setHintUsers([]);
        setLogin(user.login);
    };

    const addNewUser = async () => {
        if (currentNewUser === undefined) return;

        await GroupApi.addNewUserToGroup({
            groupId: params.group_id!,
            userId: currentNewUser.id,
        });

        await getGroupDetails(params.group_id!);

        setLogin('');
        setCurrentNewUser(undefined);
    };

    const deleteUser = async (id: string) => {
        await GroupApi.deleteUserFromGroup({
            groupId: params.group_id!,
            userId: id,
        });

        await getGroupDetails(params.group_id!);
    };

    return loading || group === undefined ? (
        'Loading'
    ) : (
        <ScrollContainer
            headerTitle={group.number}
            children={
                group.students?.map((student) => {
                    return (
                        <div key={student.id} className={styles.student}>
                            <p>{student.name}</p>
                            <p>{student.role}</p>
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
                    <div className={styles.inputContainer}>
                        <div className={styles.inputField}>
                            <Input
                                type={InputType.text}
                                placeholderText="Введите логин пользователя"
                                onChange={(value) => {
                                    setLogin(value);
                                    updateHints(value);
                                }}
                                onFocus={() => updateHints(login)}
                                // onBlur={() => setHintUsers([])}
                                value={login}
                            />
                        </div>
                        <div className={styles.hints}>
                            {hintUsers.map((user) => (
                                <div
                                    key={user.id}
                                    className={styles.hintsItem}
                                    onClick={() => onNewUserSelect(user)}>
                                    {user.login}
                                </div>
                            ))}
                        </div>
                    </div>
                    <button>
                        <img src={addIcon} onClick={addNewUser} />
                    </button>
                    {currentNewUser?.login}
                </div>
            }
        />
    );
};

export default GroupPage;
