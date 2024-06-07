import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ScrollContainer from '../../../components/ScrollContainer/ScrollContainer';
import styles from '../Subjects/SubjectsPage.module.css';
import {
    IUserSubjectGrades,
    userSubjectGradesFromJson,
} from '../../../models/grades/Grades';
import { JSONMap } from '../../../models/json';
import GradesApi from '../../../api/GradesApi';
import Button from '../../../components/Button/Button';
import { getUserFullName } from '../../../models/user/User';

const GroupGradesPage = () => {
    const [usersWithGrades, setUsersWithGrades] = useState<
        Array<IUserSubjectGrades>
    >([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const params = useParams();
    const { state } = useLocation();

    useEffect(() => {
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

        getGroupSubjectGrades();
    }, [params.subjectId, params.groupId]);

    const onUserClick = (userWithGrades: IUserSubjectGrades) => {
        navigate(
            `/grades/subject/${params.subjectId}/student/${userWithGrades.student.id}`,
            { state: userWithGrades },
        );
    };

    return loading ? (
        'Загрузка'
    ) : (
        <ScrollContainer
            headerTitle={`Группа ${state.number}`}
            emptyChildrenText="В группе нет студентов"
            children={
                usersWithGrades.map((studentWithGrades) => {
                    let sum = 0;
                    studentWithGrades.grades.forEach((grade) => {
                        sum += grade.evaluation;
                    });

                    const userName = getUserFullName(studentWithGrades.student);
                    return (
                        <div
                            key={studentWithGrades.student.id}
                            className={styles.student}
                            onClick={() => onUserClick(studentWithGrades)}>
                            <p>{userName}</p>
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
