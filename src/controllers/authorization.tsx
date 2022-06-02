import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUserInfo } from './user';

interface ISignInArguments {
    login: string;
    password: string;
}

interface ISignUpArguments {
    login: string;
    email: string;
    firstName: string;
    secondName: string;
    password: string;
    phone: string;
}

export const signIn = createAsyncThunk(
    'user/signIn',
    async (
        { login, password }: ISignInArguments,
        { rejectWithValue, dispatch }
    ) => {
        try {
            const response = await axios.post(
                '/api/auth/signin',
                { login, password },
                {
                    withCredentials: true,
                }
            );
            dispatch(getUserInfo());
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const signUp = createAsyncThunk(
    'user/signUp',
    async (
        {
            login,
            password,
            email,
            firstName,
            secondName,
            phone,
        }: ISignUpArguments,
        { rejectWithValue, dispatch }
    ) => {
        try {
            const response = await axios.post(
                '/api/auth/signup',
                {
                    login,
                    password,
                    first_name: firstName,
                    second_name: secondName,
                    email,
                    phone,
                },
                {
                    withCredentials: true,
                }
            );
            dispatch(getUserInfo());
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const signOut = createAsyncThunk('user/signOut', async () => {
    const response = await axios.post(
        '/api/auth/logout',
        {},
        {
            withCredentials: true,
        }
    );
    return response.data;
});

export const fetchOAuth = createAsyncThunk(
    'user/oauth-service-id',
    async () => {
        const redirectUri = window.location.origin;
        const response = await axios.get(
            `/api/oauth/yandex/service-id?redirect_uri=${redirectUri}`,
            { withCredentials: true }
        );
        if (response.status !== 200) {
            return;
        }
        const serviceId = response.data.service_id;
        window.location.href = ` https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId}&redirect_uri=${redirectUri}`;
    }
);

export const fetchOAuthLogin = createAsyncThunk(
    'user/oauth-login',
    async (code: string, thunkAPI) => {
        const redirectUri = window.location.origin;
        const response = await axios.post(
            '/api/oauth/yandex',
            {
                code,
                redirect_uri: redirectUri,
            },
            { withCredentials: true }
        );
        if (response.status !== 200) {
            return;
        }
        thunkAPI.dispatch(getUserInfo());
    }
);
