import { useState } from 'react';
import Form from '../../../components/Form/Form';
import { InputType } from '../../../components/Input/InputType';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import styles from './EditSubjectPage.module.css';
import SubjectsApi from '../../../api/SubjectsApi';

const CreateSubjectPage: React.FC = () => {
    const [subjectName, setSubjectName] = useState<string>('');
    const [errorCreateSubject, setErrorCreateSubject] = useState<string | null>(
        null,
    );
    const navigate = useNavigate();

    const createSubject = async () => {
        setErrorCreateSubject(null);
        await SubjectsApi.createSubject(subjectName)
            .then(() => navigate('/subjects'))
            .catch((err) => {
                console.error(err);
                setErrorCreateSubject(err.response.data.error);
            });
    };

    return (
        <Form
            name={'Создание дисциплины'}
            inputs={[
                <Input
                    type={InputType.text}
                    label="Название"
                    placeholderText="Введите название дисциплины"
                    key="name"
                    onChange={setSubjectName}
                    value={subjectName}
                />,
            ]}
            submitButton={<Button text="Создать" onClick={createSubject} />}
            footer={
                errorCreateSubject !== null ? (
                    <div className={styles.footer}>{errorCreateSubject}</div>
                ) : undefined
            }
        />
    );
};

export default CreateSubjectPage;
