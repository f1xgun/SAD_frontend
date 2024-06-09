import { Link, useNavigate } from 'react-router-dom';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { InputType } from '../../components/Input/InputType';
import styles from './RegistrationPage.module.css';
import AuthApi from '../../api/AuthApi';
import { useState } from 'react';

const RegistrationPage = () => {
    const [loginValue, setLoginValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState<string>('');
    const [middleName, setMiddleName] = useState<string>('');
    const [registrationError, setRegistrationError] = useState<string>('');

    const navigate = useNavigate();

    const onSubmit = async () => {
        await AuthApi.register({
            name: name,
            lastName: lastName,
            middleName: middleName,
            login: loginValue,
            password: passwordValue,
        })
            .then((resp) => {
                if (resp.status == 200) {
                    navigate('/login', { replace: true });
                }
            })
            .catch((err) => {
                console.error(err);
                setRegistrationError(err.response.data.error);
            });
    };

    return (
        <div className={styles.container}>
            <Form
                name="Регистрация"
                footer={
                    <div className={styles.footer}>
                        {registrationError !== null ? (
                            <div className={styles.error}>
                                {registrationError}
                            </div>
                        ) : undefined}
                        <Link to="/login">Уже зарегистрированы?</Link>
                    </div>
                }
                submitButton={
                    <Button text="Зарегистрироваться" onClick={onSubmit} />
                }
                inputs={[
                    <Input
                        type={InputType.text}
                        label="Логин"
                        placeholderText="Введите логин"
                        onChange={(value) => setLoginValue(value)}
                        key="login"
                    />,
                    <Input
                        type={InputType.password}
                        label="Пароль"
                        placeholderText="Введите пароль"
                        onChange={(value) => setPasswordValue(value)}
                        key="password"
                    />,
                    <Input
                        type={InputType.text}
                        label="Фамилия"
                        placeholderText="Введите фамилию"
                        onChange={(value) => setLastName(value)}
                        key="lastName"
                    />,
                    <Input
                        type={InputType.text}
                        label="Имя"
                        placeholderText="Введите имя"
                        onChange={(value) => setName(value)}
                        key="name"
                    />,
                    <Input
                        type={InputType.text}
                        label="Отчество"
                        placeholderText="Введите отчество"
                        onChange={(value) => setMiddleName(value)}
                        key="middleName"
                    />,
                ]}
            />
        </div>
    );
};

export default RegistrationPage;
