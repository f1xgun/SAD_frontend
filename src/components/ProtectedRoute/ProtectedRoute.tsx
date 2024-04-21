import { Navigate } from 'react-router-dom';
import { UserRole } from '../../models/user/UserRole';
import { useAppSelector } from '../../store/store';

interface ProtectedRouteProps {
    component: JSX.Element;
    allowedRoles: Array<UserRole>;
    redirectPath: string;
}

const ProtectedRoute = ({
    component,
    allowedRoles,
    redirectPath,
}: ProtectedRouteProps) => {
    const userState = useAppSelector((state) => state.user);

    if (
        userState.user === null ||
        !allowedRoles.includes(userState.user.role)
    ) {
        return <Navigate to={redirectPath} />;
    }

    return component;
};

export default ProtectedRoute;
