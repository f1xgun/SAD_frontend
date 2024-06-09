import { useCallback, useEffect, useState } from 'react';
import { ISubject, subjectFromJson } from '../../../models/subject/subject';
import SubjectsApi from '../../../api/SubjectsApi';
import styles from './EditTeacher.module.css';
import ElementControllers from '../../../components/ElementControllers/ElementControllers';
import Input from '../../../components/Input/Input';
import { InputType } from '../../../components/Input/InputType';
import Button from '../../../components/Button/Button';
import ScrollSection from '../../../components/ScrollSection/ScrollSection';

interface EditTeacherSectionProps {
    teacherId: string;
    onSave: (arg0: ISubject[]) => void;
}

const EditTeacherSection: React.FC<EditTeacherSectionProps> = ({
    teacherId,
    onSave,
}) => {
    const [teacherSubjects, setTeacherSubjects] = useState<Array<ISubject>>([]);
    const [availableNewSubjects, setAvailableNewSubjects] = useState<
        Array<ISubject>
    >([]);
    const [selectedNewSubject, setSelectedNewSubject] =
        useState<ISubject | null>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getTeacherSubjets = async () => {
            SubjectsApi.getTeachersSubjectsById(teacherId)
                .then((resp) => {
                    const subjects = resp.data.map(subjectFromJson);
                    setTeacherSubjects(subjects);
                })
                .catch((err) => {
                    setError(err.resp.data.error);
                });
        };

        const getAvailableNewSubjects = async () => {
            SubjectsApi.getAvailableNewSubjectsForTeacher(teacherId)
                .then((resp) => {
                    const subjects = resp.data.map(subjectFromJson);
                    setAvailableNewSubjects(subjects);
                })
                .catch((err) => {
                    if (err.resp != undefined) {
                        setError(err.resp.data.error);
                    } else {
                        setError(err);
                    }
                });
        };

        Promise.all([getTeacherSubjets(), getAvailableNewSubjects()]).finally(
            () => setLoading(false),
        );
    }, [teacherId]);

    const removeTeacherSubject = (removedSubject: ISubject) => {
        const newTeacherSubjects = teacherSubjects.filter(
            (subject) => subject.id != removedSubject.id,
        );

        const newAvailableTeacherSubjects = [
            ...availableNewSubjects,
            removedSubject,
        ];

        setTeacherSubjects(newTeacherSubjects);
        setAvailableNewSubjects(newAvailableTeacherSubjects);
    };

    // TODO: fix last element from select's options can't be selected, after some selects
    const selectNewSubject = (subjectName: string) => {
        const selectedSubject = availableNewSubjects.filter(
            (subject) => subject.name == subjectName,
        );
        if (selectedSubject.length == 1) {
            setSelectedNewSubject(selectedSubject[0]);
        } else {
            console.error(
                'Something went wrong, selected subject length is not equal 1',
            );
        }
    };

    const addNewSubject = () => {
        if (selectedNewSubject == null) return;

        const newAvailableTeacherSubjects = availableNewSubjects.filter(
            (subject) => subject.id != selectedNewSubject.id,
        );

        const newTeacherSubjects = [...teacherSubjects, selectedNewSubject];

        setTeacherSubjects(newTeacherSubjects);
        setAvailableNewSubjects(newAvailableTeacherSubjects);
        setSelectedNewSubject(null);
    };

    const updateTeacherSubjects = useCallback(() => {
        onSave(teacherSubjects);
    }, [teacherSubjects, onSave]);

    useEffect(() => {
        updateTeacherSubjects();
    }, [teacherSubjects, updateTeacherSubjects]);

    return error ? (
        <div className={styles.error}>{error}</div>
    ) : loading ? (
        <p>Загрузка...</p>
    ) : (
        <ScrollSection
            title={'Преподаваемые дисциплины'}
            children={
                teacherSubjects.map((subject) => {
                    return (
                        <div key={subject.id} className={styles.subject}>
                            <p className={styles.subjectName}>{subject.name}</p>
                            <div className={styles.controllers}>
                                <ElementControllers
                                    showDeleteIcon={true}
                                    onDelete={() =>
                                        removeTeacherSubject(subject)
                                    }
                                />
                            </div>
                        </div>
                    );
                }) || []
            }
            emptyChildrenText={'У преподавателя нет преподаваемых дисциплин'}
            footer={
                availableNewSubjects.length !== 0 ? (
                    <div className={styles.footer}>
                        <Input
                            type={InputType.select}
                            label="Новая преподаваемая дисциплина"
                            placeholderText="Выберите новую преподаваемую дисциплину"
                            key="new-teacher-subject"
                            onChange={selectNewSubject}
                            value={selectedNewSubject?.name}
                            options={availableNewSubjects.map(
                                (subject) => subject.name,
                            )}
                        />
                        <Button
                            text="Добавить дисциплину"
                            onClick={addNewSubject}
                        />
                    </div>
                ) : (
                    <></>
                )
            }
        />
    );
};

export default EditTeacherSection;
