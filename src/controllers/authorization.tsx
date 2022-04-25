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
        { rejectWithValue, dispatch },
    ) => {
        try {
            const response = await axios.post(
                '/auth/signin',
                { login, password },
                {
                    withCredentials: true,
                },
            );
            dispatch(getUserInfo());
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    },
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
        { rejectWithValue, dispatch },
    ) => {
        try {
            const response = await axios.post(
                '/auth/signup',
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
                },
            );
            dispatch(getUserInfo());
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    },
);

export const signOut = createAsyncThunk('user/signOut', async () => {
    const response = await axios.post(
        '/auth/logout',
        {},
        {
            withCredentials: true,
        },
    );
    return response.data;
});
