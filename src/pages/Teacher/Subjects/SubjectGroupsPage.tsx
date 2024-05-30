import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ScrollContainer from '../../../components/ScrollContainer/ScrollContainer';
import { JSONMap } from '../../../models/json';
import styles from './SubjectsPage.module.css';
import { IGroup, groupFromJson } from '../../../models/group/group';
import GroupApi from '../../../api/GroupApi';

const SubjectGroupsPage = () => {
    const [groups, setGroups] = useState<IGroup[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if (params.subjectId === undefined) {
            return;
        }

        const getSubjectGroupList = async () => {
            setLoading(true);
            await GroupApi.getGroupsByTeacherAndSubject(params.subjectId!)
                .then((response) => {
                    const groups = response.data.map((group: JSONMap) =>
                        groupFromJson(group),
                    );
                    setGroups(groups);
                })
                .catch((err) => console.error(err))
                .finally(() => setLoading(false));
        };

        getSubjectGroupList();
    }, [params.subjectId]);

    const onGroupClick = (group: IGroup) => {
        navigate(`/groups/${group.id}/subject/${params.subjectId}/grades`, {
            state: group,
        });
    };

    return loading ? (
        'Загрузка'
    ) : (
        <ScrollContainer
            emptyChildrenText="Список групп пустой"
            headerTitle="Выберите группу"
            children={
                groups.map((group) => {
                    return (
                        <div
                            key={group.id}
                            className={styles.group}
                            onClick={() => onGroupClick(group)}>
                            <div>{group.number}</div>
                        </div>
                    );
                }) || []
            }
        />
    );
};

export default SubjectGroupsPage;
