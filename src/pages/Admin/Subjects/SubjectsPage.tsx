import { useEffect, useState } from 'react';
import styles from './SubjectsPage.module.css';
import ScrollContainer from '../../../components/ScrollContainer/ScrollContainer';
import ElementControllers from '../../../components/ElementControllers/ElementControllers';
import { useNavigate } from 'react-router-dom';
import { JSONMap } from '../../../models/json';
import SubjectsApi from '../../../api/SubjectsApi';
import {
    ISubjectDetails,
    subjectFromJson,
} from '../../../models/subject/subject';
import Button from '../../../components/Button/Button';

const SubjectsPage = () => {
    const [subjects, setSubjects] = useState<Array<ISubjectDetails>>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getSubjectsList();
    }, []);

    const getSubjectsList = async () => {
        setLoading(true);
        await SubjectsApi.getSubjects()
            .then((response) => {
                setSubjects(
                    response.data.map((subject: JSONMap) =>
                        subjectFromJson(subject),
                    ),
                );
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    };

    const deleteSubject = async (subjectId: string) => {
        await SubjectsApi.deleteSubject(subjectId).catch((err) =>
            console.error(err),
        );
        await getSubjectsList();
    };

    return loading ? (
        'Загрузка'
    ) : (
        <ScrollContainer
            emptyChildrenText="Список дисциплин пуст"
            headerTitle="Дисциплины"
            children={
                subjects.map((subject) => {
                    return (
                        <div key={subject.id} className={styles.subject}>
                            <p className={styles.subjectName}>{subject.name}</p>
                            <div className={styles.controllers}>
                                <ElementControllers
                                    showDeleteIcon={true}
                                    showEditIcon={true}
                                    onEdit={() =>
                                        navigate(
                                            `/subjects/${subject.id}/edit`,
                                            {
                                                state: {
                                                    subject: subject,
                                                },
                                            },
                                        )
                                    }
                                    onDelete={() => deleteSubject(subject.id)}
                                />
                            </div>
                        </div>
                    );
                }) || []
            }
            footer={
                <Button
                    text="Добавить дисциплину"
                    onClick={() => navigate('/subjects/create')}
                />
            }
        />
    );
};

export default SubjectsPage;
