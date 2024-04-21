import { useState } from 'react';
import Form from '../../../components/Form/Form';
import { InputType } from '../../../components/Input/InputType';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import GroupApi from '../../../api/GroupApi';
import { useNavigate } from 'react-router-dom';
import styles from './AddGroupPage.module.css';

const AddGroupPage = () => {
    const [groupNumber, setGroupNumber] = useState<string>('');
    const [errorCreateGroup, setErrorCreateGroup] = useState<string | null>(
        null,
    );
    const navigate = useNavigate();

    const createGroup = async () => {
        await GroupApi.createGroup(groupNumber)
            .then(() => navigate('/groups'))
            .catch((err) => {
                console.error(err);
                setErrorCreateGroup(err.response.data.error);
            });
    };

    return (
        <Form
            name={'Создание группы'}
            inputs={[
                <Input
                    type={InputType.text}
                    label="Номер группы"
                    placeholderText="Введите номер новой группы"
                    key="number"
                    onChange={(value) => setGroupNumber(value)}
                />,
            ]}
            submitButton={<Button text="Создать" onClick={createGroup} />}
            footer={
                errorCreateGroup !== null ? (
                    <div className={styles.footer}>{errorCreateGroup}</div>
                ) : undefined
            }
        />
    );
};

export default AddGroupPage;
