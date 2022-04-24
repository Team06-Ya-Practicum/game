import React, { useEffect } from 'react';
import { Navigate } from 'react-router';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getUserInfo } from 'controllers/user';
import { ROUTES } from '../../index';

interface IPrivateRouteProps {
    component: JSX.Element;
}

export const PrivateRoute = ({ component }: IPrivateRouteProps) => {
    const isAuthorized = useAppSelector(state => state.user.isAuthorized);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (isAuthorized === null) {
            dispatch(getUserInfo());
        }
    }, [dispatch, isAuthorized]);

    if (isAuthorized === false) {
        return <Navigate to={ROUTES.SIGN_IN} />;
    }

    return component;
};
