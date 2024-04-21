import { useEffect, useState } from 'react';
import UserApi from '../../api/UserApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../../slices/userSlice';
import { useAppSelector } from '../../store/store';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';
import Navbar from '../../components/Navbar/Navbar';

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const userState = useAppSelector((state) => state.user);

    useEffect(() => {
        setLoading(true);
        UserApi.getUserInfo()
            .then((response) => {
                if (response.status == 200) {
                    dispatch(setUser(response.data));
                }
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [dispatch]);

    if (loading) {
        return <div className={styles.container}>Loading...</div>;
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
