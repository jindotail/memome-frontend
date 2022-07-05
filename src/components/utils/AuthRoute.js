// AuthRoute.js

import { Navigate, useLocation } from 'react-router-dom';

const AuthRoute = ({ component }) => {
    const location = useLocation();
    const sessionID = sessionStorage.getItem("user_id");

    if (!sessionID) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return component
}

export default AuthRoute;