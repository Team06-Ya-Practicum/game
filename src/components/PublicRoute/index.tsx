import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router';
import { getUserInfo } from '../../controllers/user';
import { ROUTES } from '../../index';

interface IPublicRouteProps {
    component: JSX.Element;
}

export const PublicRoute = ({ component }: IPublicRouteProps) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    useEffect(() => {
        getUserInfo().then(response => {
            if (response.status) {
                setIsAuthorized(true);
            }
        });
    }, []);

    if (isAuthorized) {
        return <Navigate to={ROUTES.GAME} />;
    }

    return component;
};
