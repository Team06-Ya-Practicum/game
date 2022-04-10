import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router';
import { getUserInfo } from '../../controllers/user';
import { ROUTES } from '../../index';

interface IPrivateRouteProps {
    component: JSX.Element;
}

export const PrivateRoute = ({ component }: IPrivateRouteProps) => {
    const [isAuthorized, setIsAuthorized] = useState(true);
    useEffect(() => {
        getUserInfo().then(response => {
            if (!response.status) {
                setIsAuthorized(false);
            }
        });
    }, []);

    if (!isAuthorized) {
        return <Navigate to={ROUTES.SIGN_IN} />;
    }

    return component;
};
