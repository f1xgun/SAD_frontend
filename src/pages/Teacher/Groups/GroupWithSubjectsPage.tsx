import { useLocation, useNavigate } from 'react-router-dom';
import ScrollContainer from '../../../components/ScrollContainer/ScrollContainer';
import { IGroupWithSubjects } from '../../../models/group/group';
import styles from '../Subjects/SubjectsPage.module.css';
import { ISubject } from '../../../models/subject/subject';

const GroupWithSubjectsPage = () => {
    const { state } = useLocation();
    const group: IGroupWithSubjects = state?.group;
    const navigate = useNavigate();

    const onSubjectClick = (subject: ISubject) => {
        navigate(`/groups/${group.group.id}/subject/${subject.id}/grades`, {
            state: { group: group.group },
        });
    };

    return (
        <ScrollContainer
            emptyChildrenText="Список дисциплин пуст"
            headerTitle={`Дисциплины группы ${group.group.number}`}
            children={
                group.subjects.map((subject) => {
                    return (
                        <div
                            key={subject.id}
                            className={styles.subject}
                            onClick={() => onSubjectClick(subject)}>
                            {subject.name}
                        </div>
                    );
                }) || []
            }
        />
    );
};

export default GroupWithSubjectsPage;
