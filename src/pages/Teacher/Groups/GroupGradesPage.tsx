import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ScrollContainer from '../../../components/ScrollContainer/ScrollContainer';
import styles from './GroupsPage.module.css';
import {
    IUserSubjectGrades,
    userSubjectGradesFromJson,
} from '../../../models/grades/Grades';
import { JSONMap } from '../../../models/json';
import GradesApi from '../../../api/GradesApi';
import Button from '../../../components/Button/Button';

const GroupGradesPage = () => {
    const [usersWithGrades, setUsersWithGrades] = useState<
        Array<IUserSubjectGrades>
    >([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const params = useParams();
    const { state } = useLocation();

    useEffect(() => {
        getGroupSubjectGrades();
    }, []);

    const getGroupSubjectGrades = async () => {
        setLoading(true);
        await GradesApi.getGroupGradesBySubjectId({
            groupId: params.groupId!,
            subjectId: params.subjectId!,
            isFinalGrades: false,
        })
            .then((response) => {
                setUsersWithGrades(
                    response.data.map((json: JSONMap) =>
                        userSubjectGradesFromJson(json),
                    ),
                );
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    };

    const onUserClick = (userWithGrades: IUserSubjectGrades) => {
        navigate(
            `/grades/subject/${params.subjectId}/student/${userWithGrades.student.id}`,
            { state: userWithGrades },
        );
    };

    return loading ? (
        'Loading'
    ) : (
        <ScrollContainer
            headerTitle={state.group.number}
            emptyChildrenText="Nobody student in this group"
            children={
                usersWithGrades.map((studentWithGrades) => {
                    let sum = 0;
                    studentWithGrades.grades.forEach((grade) => {
                        sum += grade.evaluation;
                    });

                    return (
                        <div
                            key={studentWithGrades.student.id}
                            className={styles.student}
                            onClick={() => onUserClick(studentWithGrades)}>
                            <p>{studentWithGrades.student.name}</p>
                            {studentWithGrades.grades.length > 0 && (
                                <p>
                                    {Math.round(
                                        sum / studentWithGrades.grades.length,
                                    )}
                                </p>
                            )}
                        </div>
                    );
                }) || []
            }
            footer={
                <Button
                    text="Итоговые оценки"
                    onClick={() =>
                        navigate('../final-grades', {
                            state: state,
                            relative: 'path',
                        })
                    }
                />
            }
        />
    );
};

export default GroupGradesPage;