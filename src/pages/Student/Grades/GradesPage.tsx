import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../store/store';
import GradesApi from '../../../api/GradesApi';
import { UserRole } from '../../../models/user/UserRole';
import { setGrades } from '../../../slices/userSlice';
import { useDispatch } from 'react-redux';
import styles from './GradesPage.module.css';
import ScrollContainer from '../../../components/ScrollContainer/ScrollContainer';
import { JSONMap } from '../../../models/json';
import { gradeFromJson } from '../../../models/grades/Grades';
import Button from '../../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

const GradesPage = () => {
    const [loading, setLoading] = useState(true);
    const userState = useAppSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (
            userState.user != undefined &&
            userState.user.role == UserRole.Student
        ) {
            GradesApi.getStudentGrades({
                userId: userState.user.id,
                isFinal: false,
            }).then((response) => {
                if (response.status == 200) {
                    const grades = response.data.map((json: JSONMap) =>
                        gradeFromJson(json),
                    );

                    dispatch(setGrades(grades));
                }
                setLoading(false);
            });
        }
    }, [userState.user, dispatch]);

    return loading ? (
        'Загрузка'
    ) : (
        <ScrollContainer
            emptyChildrenText="Список оценок пуст"
            headerTitle="Последние оценки"
            children={
                userState.grades?.map((grade) => {
                    return (
                        <div key={grade.id} className={styles.grade}>
                            <p className={styles.subjectName}>
                                {grade.subjectName}
                            </p>
                            <p className={styles.evaluation}>
                                {grade.evaluation}
                            </p>
                            <p className={styles.date}>
                                {grade.createdDate.toLocaleDateString()}
                            </p>
                        </div>
                    );
                }) || []
            }
            footer={
                <Button
                    text="Итоговые оценки"
                    onClick={() =>
                        navigate('../final-grades', {
                            relative: 'path',
                        })
                    }
                />
            }
        />
    );
};

export default GradesPage;
