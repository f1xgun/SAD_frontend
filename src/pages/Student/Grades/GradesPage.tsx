import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../store/store';
import GradesApi from '../../../api/GradesApi';
import { UserRole } from '../../../models/user/UserRole';
import { setGrades } from '../../../slices/userSlice';
import { useDispatch } from 'react-redux';
import styles from './GradesPage.module.css';
import ScrollContainer from '../../../components/ScrollContainer/ScrollContainer';

const GradesPage = () => {
    const [loading, setLoading] = useState(true);
    const userState = useAppSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (
            userState.user != undefined &&
            userState.user.role == UserRole.Student
        ) {
            GradesApi.getStudentGrades(userState.user.id).then((response) => {
                if (response.status == 200) {
                    const grades = response.data.map(
                        (grade: { [key: string]: unknown }) => ({
                            id: grade.id,
                            subjectName: grade.subject_name,
                            createdDate: new Date(grade.created_at as string),
                            evaluation: grade.evaluation,
                        }),
                    );

                    dispatch(setGrades(grades));
                }
                setLoading(false);
            });
        }
    }, [userState.user, dispatch]);

    return loading ? (
        'Loading'
    ) : (
        <ScrollContainer
            headerTitle="Последние оценки"
            children={
                userState.grades?.map((grade) => {
                    return (
                        <div key={grade.id} className={styles.grade}>
                            <p>{grade.subjectName}</p>
                            <p>{grade.evaluation}</p>
                            <p>{grade.createdDate.toLocaleDateString()}</p>
                        </div>
                    );
                }) || []
            }
        />
    );
};

export default GradesPage;
