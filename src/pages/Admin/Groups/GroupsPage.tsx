import { useEffect, useState } from 'react';
import GroupApi from '../../../api/GroupApi';
import { IGroup } from '../../../models/group/group';
import styles from './GroupsPage.module.css';
import ScrollContainer from '../../../components/ScrollContainer/ScrollContainer';
import ElementControllers from '../../../components/ElementControllers/ElementControllers';
import { useNavigate } from 'react-router-dom';

const GroupsPage = () => {
    const [groups, setGroups] = useState<Array<IGroup>>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        GroupApi.getGroups()
            .then((response) => {
                setGroups(
                    response.data.map((group: { [key: string]: unknown }) => ({
                        id: group.id,
                        number: group.number,
                    })),
                );
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return loading ? (
        'Loading'
    ) : (
        <ScrollContainer
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
                                    onDelete={() => console.log('delete')}
                                />
                            </div>
                        </div>
                    );
                }) || []
            }
        />
    );
};

export default GroupsPage;
