import { useState } from 'react';
import Form from '../../../components/Form/Form';
import { InputType } from '../../../components/Input/InputType';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import GroupApi from '../../../api/GroupApi';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './AddGroupPage.module.css';

const EditGroupPage: React.FC = () => {
    const { state } = useLocation();
    const [groupNumber, setGroupNumber] = useState<string>(state.groupNumber);
    const [errorEditGroup, setErrorEditGroup] = useState<string | null>(null);
    const navigate = useNavigate();
    const params = useParams();

    const editGroup = async () => {
        if (params.groupId === undefined) return;
        await GroupApi.editGroup({
            groupId: params.groupId,
            number: groupNumber,
        })
            .then(() => navigate('/groups'))
            .catch((err) => {
                console.error(err);
                setErrorEditGroup(err.response.data.error);
            });
    };

    return (
        <Form
            name={'Редактирование группы'}
            inputs={[
                <Input
                    type={InputType.text}
                    label="Номер группы"
                    placeholderText="Введите новый номер группы"
                    key="number"
                    onChange={(value) => setGroupNumber(value)}
                    value={groupNumber}
                />,
            ]}
            inputs2={[]}
            submitButton={<Button text="Изменить" onClick={editGroup} />}
            footer={
                errorEditGroup !== null ? (
                    <div className={styles.footer}>{errorEditGroup}</div>
                ) : undefined
            }
        />
    );
};

export default EditGroupPage;
