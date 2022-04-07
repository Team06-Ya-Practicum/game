import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router';

export const PublicRoute = ({ component }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    axios
        .get('/api/auth/user', { withCredentials: true })
        .then(() => setIsAuthorized(true));

    if (isAuthorized) {
        return <Navigate to="/game" />;
    }

    return component;
};
