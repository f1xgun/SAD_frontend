import { useEffect, useState } from 'react';
import {
    IGroupWithSubjects,
    groupWithSubjectsFromJson,
} from '../../../models/group/group';
import GroupApi from '../../../api/GroupApi';
import { JSONMap } from '../../../models/json';
import { useAppSelector } from '../../../store/store';
import GradesTable from './GradesTable';
import { InputType } from '../../../components/Input/InputType';
import Input from '../../../components/Input/Input';
import styles from './GradesPage.module.css';
import { ISubject } from '../../../models/subject/subject';
import {
    IUserSubjectGrades,
    userSubjectGradesFromJson,
} from '../../../models/grades/Grades';
import GradesApi from '../../../api/GradesApi';

const GradesTablePage = () => {
    const [groups, setGroups] = useState<Array<IGroupWithSubjects>>([]);
    const [selectedGroup, setSelectedGroup] =
        useState<IGroupWithSubjects | null>(null);
    const [selectedSubject, setSelectedSubject] = useState<ISubject | null>(
        null,
    );
    const [studentsWithGrades, setStudentsWithGrades] = useState<
        Array<IUserSubjectGrades>
    >([]);

    const [loading, setLoading] = useState(true);

    const userState = useAppSelector((state) => state.user.user);

    useEffect(() => {
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

        getGroupsWithSubjectsList();
    }, [userState?.id]);

    useEffect(() => {
        if (selectedGroup === null || selectedSubject === null) {
            setStudentsWithGrades([]);
            return;
        }

        const getGroupSubjectGrades = async () => {
            setLoading(true);
            await GradesApi.getGroupGradesBySubjectId({
                groupId: selectedGroup.group.id,
                subjectId: selectedSubject.id,
                isFinalGrades: false,
            })
                .then((response) => {
                    setStudentsWithGrades(
                        response.data.map((json: JSONMap) =>
                            userSubjectGradesFromJson(json),
                        ),
                    );
                })
                .catch((err) => console.error(err))
                .finally(() => setLoading(false));
        };

        getGroupSubjectGrades();
    }, [selectedGroup, selectedSubject]);

    const handleSelectedGroup = (groupNumber: string) => {
        const group = groups.filter(
            (group) => group.group.number == groupNumber,
        )[0];
        setSelectedGroup(group);
        // setSelectedSubject(null);
    };

    const handleChangeSubject = (subjectName: string) => {
        const subject = selectedGroup?.subjects.filter(
            (subject) => subject.name == subjectName,
        )[0];
        if (subject !== undefined) {
            setSelectedSubject(subject);
        }
    };

    return loading ? (
        <div>Loading</div>
    ) : (
        <div className={styles.container}>
            <div className={styles.searchSelects}>
                <Input
                    type={InputType.select}
                    label="Номер группы"
                    placeholderText="Выберите номер группы"
                    key="group_number"
                    onChange={handleSelectedGroup}
                    value={selectedGroup?.group.number}
                    options={groups.map((group) => group.group.number)}
                />
                <Input
                    type={InputType.select}
                    label="Предмет"
                    placeholderText="Выберите предмет"
                    key="subject"
                    onChange={handleChangeSubject}
                    value={selectedSubject?.name}
                    options={selectedGroup?.subjects.map(
                        (subject) => subject.name,
                    )}
                />
            </div>
            <GradesTable studentsWithGrades={studentsWithGrades} />
        </div>
    );
};

export default GradesTablePage;
