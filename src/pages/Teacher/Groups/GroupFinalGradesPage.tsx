import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ScrollContainer from '../../../components/ScrollContainer/ScrollContainer';
import styles from '../Subjects/SubjectsPage.module.css';
import {
    IUserSubjectGrades,
    finalGrades,
    userSubjectGradesFromJson,
} from '../../../models/grades/Grades';
import { JSONMap } from '../../../models/json';
import GradesApi from '../../../api/GradesApi';
import Button from '../../../components/Button/Button';

const GroupFinalGradesPage = () => {
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
                isFinalGrades: true,
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
    }, [params.groupId, params.subjectId]);

    const onUserClick = (userWithGrades: IUserSubjectGrades) => {
        navigate(
            `/grades/subject/${params.subjectId}/student/${userWithGrades.student.id}/final`,
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
                    return (
                        <div
                            key={studentWithGrades.student.id}
                            className={styles.student}
                            onClick={() => onUserClick(studentWithGrades)}>
                            <p>{studentWithGrades.student.name}</p>
                            {studentWithGrades.grades.length > 0 && (
                                <p>
                                    {finalGrades[
                                        studentWithGrades.grades[0].evaluation
                                    ] || finalGrades[0]}
                                </p>
                            )}
                        </div>
                    );
                }) || []
            }
            footer={
                <Button
                    text="Промежуточные оценки"
                    onClick={() =>
                        navigate('../grades', {
                            state: state,
                            relative: 'path',
                        })
                    }
                />
            }
        />
    );
};

export default GroupFinalGradesPage;
