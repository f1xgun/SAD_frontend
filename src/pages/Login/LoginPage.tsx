import { Link, useNavigate } from 'react-router-dom';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { InputType } from '../../components/Input/InputType';
import styles from './LoginPage.module.css';
import AuthApi from '../../api/AuthApi';
import { useState } from 'react';

const LoginPage = () => {
    const [loginValue, setLoginValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const navigate = useNavigate();

    const onSubmit = async () => {
        const response = await AuthApi.login({
            login: loginValue,
            password: passwordValue,
        });

        if (response) {
            navigate('/');
        }
    };

    return (
        <div className={styles.container}>
            <Form
                name="Вход"
                footer={
                    <div className={styles.footer}>
                        <Link to="/register">Нужна учетная запись?</Link>
                    </div>
                }
                submitButton={<Button text="Войти" onClick={onSubmit} />}
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
                ]}
            />
        </div>
    );
};

export default LoginPage;
