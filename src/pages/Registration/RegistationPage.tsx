import { Link, redirect } from 'react-router-dom';
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
    const [fioValue, setFioValue] = useState('');

    const onSubmit = async () => {
        try {
            const response = await AuthApi.register({
                name: fioValue,
                login: loginValue,
                password: passwordValue,
            });

            if (response.status == 200) {
                redirect('/auth');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={styles.container}>
            <Form
                name="Регистрация"
                footer={
                    <div className={styles.footer}>
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
                        label="ФИО"
                        placeholderText="Введите ФИО"
                        onChange={(value) => setFioValue(value)}
                        key="password"
                    />,
                ]}
            />
        </div>
    );
};

export default RegistrationPage;
