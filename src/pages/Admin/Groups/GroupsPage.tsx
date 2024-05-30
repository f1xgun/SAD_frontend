import { useEffect, useState } from 'react';
import GroupApi from '../../../api/GroupApi';
import { IGroup, groupFromJson } from '../../../models/group/group';
import styles from './GroupsPage.module.css';
import ScrollContainer from '../../../components/ScrollContainer/ScrollContainer';
import ElementControllers from '../../../components/ElementControllers/ElementControllers';
import { useNavigate } from 'react-router-dom';
import { JSONMap } from '../../../models/json';
import Button from '../../../components/Button/Button';

const GroupsPage = () => {
    const [groups, setGroups] = useState<Array<IGroup>>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getGroupsList();
    }, []);

    const getGroupsList = async () => {
        setLoading(true);
        await GroupApi.getGroups()
            .then((response) => {
                setGroups(
                    response.data.map((group: JSONMap) => groupFromJson(group)),
                );
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    };

    const deleteGroup = async (groupId: string) => {
        await GroupApi.deleteGroup(groupId).catch((err) => console.error(err));
        await getGroupsList();
    };

    return loading ? (
        'Загрузка'
    ) : (
        <ScrollContainer
            emptyChildrenText="Список групп пуст"
            headerTitle="Группы"
            children={
                groups.map((group) => {
                    return (
                        <div key={group.id} className={styles.group}>
                            <p>{group.number}</p>
                            <div className={styles.controllers}>
                                <ElementControllers
                                    showDeleteIcon={true}
                                    showEditIcon={true}
                                    onEdit={() =>
                                        navigate(`/groups/${group.id}`)
                                    }
                                    onDelete={() => deleteGroup(group.id)}
                                />
                            </div>
                        </div>
                    );
                }) || []
            }
            footer={
                <Button
                    text="Добавить группу"
                    onClick={() => navigate('/groups/create')}
                />
            }
        />
    );
};

export default GroupsPage;
