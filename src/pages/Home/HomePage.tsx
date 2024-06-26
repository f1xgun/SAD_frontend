import { useEffect, useState } from 'react';
import UserApi from '../../api/UserApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../../slices/userSlice';
import { useAppSelector } from '../../store/store';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';
import Navbar from '../../components/Navbar/Navbar';
import { userFromJson } from '../../models/user/User';

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const userState = useAppSelector((state) => state.user);

    useEffect(() => {
        const getUserInfo = async () => {
            setLoading(true);
            await UserApi.getSelfUserInfo()
                .then((response) => {
                    if (response.status == 200) {
                        dispatch(setUser(userFromJson(response.data)));
                    }
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        };

        getUserInfo();
    }, [dispatch]);

    if (loading) {
        return <div className={styles.container}>Загрузка...</div>;
    }

    if (userState.user === null) {
        navigate('/login');
        return;
    }

    return (
        <div className={styles.container}>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default HomePage;
