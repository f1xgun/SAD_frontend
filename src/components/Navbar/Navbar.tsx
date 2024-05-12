import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import styles from './Navbar.module.css';
import { UserRole } from '../../models/user/UserRole';

const Navbar = () => {
    const user = useAppSelector((state) => state.user.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header className={styles.header}>
            {user != null && (
                <>
                    {user.role === UserRole.Student && (
                        <NavLink to="grades" className={styles.navBlock}>
                            Оценки
                        </NavLink>
                    )}
                    {user.role === UserRole.Teacher && (
                        <NavLink to="groups" className={styles.navBlock}>
                            Группы
                        </NavLink>
                    )}
                    {user.role === UserRole.Admin && (
                        <div className={styles.navBlocksContainer}>
                            <NavLink to="groups" className={styles.navBlock}>
                                Группы
                            </NavLink>
                            <NavLink to="users" className={styles.navBlock}>
                                Пользователи
                            </NavLink>
                            <NavLink to="subjects" className={styles.navBlock}>
                                Дисциплины
                            </NavLink>
                        </div>
                    )}
                </>
            )}
            {user != null && (
                <div className={styles.userInfo}>
                    <div className={styles.navBlock}>{user.login}</div>
                    <div className={styles.navBlock}>{user.name}</div>
                    <div
                        className={`${styles.navBlock} ${styles.button}`}
                        onClick={onLogout}>
                        Выйти
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
