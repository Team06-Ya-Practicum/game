import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router';

interface IPrivateRouteProps {
    component: JSX.Element;
}

export const PrivateRoute = (props: IPrivateRouteProps) => {
    const { component } = props;
    const [isAuthorized, setIsAuthorized] = useState(true);
    axios
        .get('/api/auth/user', { withCredentials: true })
        .catch(() => setIsAuthorized(false));

    if (!isAuthorized) {
        return <Navigate to="/signin" />;
    }

    return component;
};
