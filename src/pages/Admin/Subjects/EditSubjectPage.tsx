import { useEffect, useState } from 'react';
import Form from '../../../components/Form/Form';
import { InputType } from '../../../components/Input/InputType';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { useLocation, useParams } from 'react-router-dom';
import styles from './EditSubjectPage.module.css';
import SubjectsApi from '../../../api/SubjectsApi';

const EditSubjectPage: React.FC = () => {
    const { state } = useLocation();
    const [subjectName, setSubjectName] = useState<string>(state.subject.name);

    const [errorEditSubject, setErrorEditSubject] = useState<string | null>(
        null,
    );
    const [loading, setLoading] = useState<boolean>(true);
    const params = useParams();

    const editSubject = async () => {
        setErrorEditSubject(null);
        if (params.subjectId === undefined) return;
        await SubjectsApi.editSubject({
            subjectId: params.subjectId,
            name: subjectName,
        })
            .then((resp) => {
                if (resp.status === 200) {
                    setErrorEditSubject('Данные успешно обновлены');
                }
            })
            .catch((err) => {
                console.error(err);
                setErrorEditSubject(err.response.data.error);
            });
    };

    useEffect(() => {
        const getSubject = async () => {
            if (params.subjectId === undefined) return;
            const response = await SubjectsApi.getSubjectDetails(
                params.subjectId,
            );
            if (response.status !== 200) {
                setErrorEditSubject(response.data.error);
            }
            setLoading(false);
        };

        getSubject();
    }, [params.subjectId]);

    return loading ? (
        'Загрузка'
    ) : (
        <Form
            name={'Редактирование дисциплины'}
            inputs={[
                <Input
                    type={InputType.text}
                    label="Название"
                    placeholderText="Введите новое название дисциплины"
                    key="name"
                    onChange={(value) => setSubjectName(value)}
                    value={subjectName}
                />,
            ]}
            submitButton={<Button text="Изменить" onClick={editSubject} />}
            footer={
                errorEditSubject !== null ? (
                    <div className={styles.footer}>{errorEditSubject}</div>
                ) : undefined
            }
        />
    );
};

export default EditSubjectPage;
