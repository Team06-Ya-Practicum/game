import React, { useEffect } from 'react';
import { Navigate } from 'react-router';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { getUserInfo } from '../../controllers/user';
import { ROUTES } from '../../routes';

interface IPublicRouteProps {
    component: JSX.Element;
}

export const PublicRoute = ({ component }: IPublicRouteProps) => {
    const dispatch = useAppDispatch();
    const isAuthorized = useAppSelector(state => state.user.isAuthorized);
    useEffect(() => {
        if (isAuthorized === null) {
            dispatch(getUserInfo());
        }
    }, [dispatch, isAuthorized]);

    if (isAuthorized === true) {
        return <Navigate to={ROUTES.GAME} />;
    }

    return component;
};
