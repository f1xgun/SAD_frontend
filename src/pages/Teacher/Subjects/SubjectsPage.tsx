import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollContainer from '../../../components/ScrollContainer/ScrollContainer';
import { JSONMap } from '../../../models/json';
import styles from './SubjectsPage.module.css';
import { ISubject, subjectFromJson } from '../../../models/subject/subject';
import SubjectsApi from '../../../api/SubjectsApi';

const SubjectsPage = () => {
    const [subjects, setSubjects] = useState<ISubject[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getSubjectList = async () => {
            setLoading(true);
            await SubjectsApi.getTeachersSubjects()
                .then((response) => {
                    const subjects = response.data.map((subject: JSONMap) =>
                        subjectFromJson(subject),
                    );
                    setSubjects(subjects);
                })
                .catch((err) => console.error(err))
                .finally(() => setLoading(false));
        };

        getSubjectList();
    }, []);

    const onSubjectClick = (subject: ISubject) => {
        navigate(`/subject_groups/${subject.id}/`);
    };

    return loading ? (
        'Загрузка'
    ) : (
        <ScrollContainer
            emptyChildrenText="Список дисциплин пустой"
            headerTitle="Выберите дисциплину"
            children={
                subjects.map((subject) => {
                    return (
                        <div
                            key={subject.id}
                            className={styles.subject}
                            onClick={() => onSubjectClick(subject)}>
                            <div>{subject.name}</div>
                        </div>
                    );
                }) || []
            }
        />
    );
};

export default SubjectsPage;
