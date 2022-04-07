import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router';

export const PrivateRoute = ({ component }) => {
    const [isAuthorized, setIsAuthorized] = useState(true);
    axios
        .get('/api/auth/user', { withCredentials: true })
        .catch(() => setIsAuthorized(false));

    if (!isAuthorized) {
        return <Navigate to="/signin" />;
    }

    return component;
};
