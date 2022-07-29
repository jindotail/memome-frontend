import { Navigate, useLocation } from 'react-router-dom';
import { getCookie } from '../../hooks/cookie';

const AuthRoute = ({ component }) => {
    const location = useLocation();
    const sessionID = getCookie("user_id");

    if (!sessionID) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return component
}

export default AuthRoute;