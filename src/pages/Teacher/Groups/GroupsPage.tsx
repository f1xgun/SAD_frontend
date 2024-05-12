import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GroupApi from '../../../api/GroupApi';
import ScrollContainer from '../../../components/ScrollContainer/ScrollContainer';
import {
    IGroupWithSubjects,
    groupWithSubjectsFromJson,
} from '../../../models/group/group';
import { JSONMap } from '../../../models/json';
import { useAppSelector } from '../../../store/store';
import styles from './GroupsPage.module.css';

const GroupsPage = () => {
    const [groups, setGroups] = useState<Array<IGroupWithSubjects>>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const userState = useAppSelector((state) => state.user.user);

    useEffect(() => {
        getGroupsWithSubjectsList();
    }, []);

    const getGroupsWithSubjectsList = async () => {
        if (userState?.id === undefined) return;
        setLoading(true);
        await GroupApi.getTeacherGroupsWithSubjects(userState.id)
            .then((response) => {
                setGroups(
                    response.data.map((group: JSONMap) =>
                        groupWithSubjectsFromJson(group),
                    ),
                );
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    };

    const onGroupClick = (group: IGroupWithSubjects) => {
        if (group.subjects.length === 1) {
            navigate(
                `/groups/${group.group.id}/subject/${group.subjects[0].id}/grades`,
                { state: group },
            );
        } else {
            navigate(`/groups/${group.group.id}/subjects`, {
                state: { group: group },
            });
        }
    };

    return loading ? (
        'Loading'
    ) : (
        <ScrollContainer
            emptyChildrenText="Groups list is empty"
            headerTitle="Ваши группы"
            children={
                groups.map((groupWithSubjects) => {
                    return (
                        <div
                            key={groupWithSubjects.group.id}
                            className={styles.group}
                            onClick={() => onGroupClick(groupWithSubjects)}>
                            <div>{groupWithSubjects.group.number}</div>
                            <div>{groupWithSubjects.subjects.length}</div>
                        </div>
                    );
                }) || []
            }
        />
    );
};

export default GroupsPage;
