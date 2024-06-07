import { useAppSelector } from '../../store/store';
import styles from './UserInfoPage.module.css';

const UserInfoPage = () => {
    const user = useAppSelector((state) => state.user.user);

    return (
        <div className={styles.container}>
            <div className={styles.header}>Информация о пользователе</div>
            <div className={styles.scrollContainer}>
                <div className={styles.element}>Идентификатор: {user?.id}</div>
                <div className={styles.element}>Логин: {user?.login}</div>
                <div className={styles.element}>Фамилия: {user?.lastName}</div>
                <div className={styles.element}>Имя: {user?.name}</div>
                <div className={styles.element}>
                    Отчество:{' '}
                    {user?.middleName != null &&
                    user?.middleName != undefined &&
                    user?.middleName != ''
                        ? user?.middleName
                        : 'отсутствует'}
                </div>
                <div className={styles.element}>Роль: {user?.role}</div>
            </div>
        </div>
    );
};

export default UserInfoPage;
