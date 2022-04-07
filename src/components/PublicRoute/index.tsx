import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router';

interface IPublicRouteProps {
    component: JSX.Element;
}

export const PublicRoute = (props: IPublicRouteProps) => {
    const { component } = props;
    const [isAuthorized, setIsAuthorized] = useState(false);
    axios
        .get('/api/auth/user', { withCredentials: true })
        .then(() => setIsAuthorized(true));

    if (isAuthorized) {
        return <Navigate to="/game" />;
    }

    return component;
};
