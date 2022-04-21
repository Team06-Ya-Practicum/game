import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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

export const signIn = async ({ login, password }: ISignInArguments) => {
    try {
        await axios.post(
            '/auth/signin',
            {
                login,
                password,
            },
            { withCredentials: true },
        );
        return { status: true, message: '' };
    } catch (error: any) {
        return { status: false, message: error.response.data.reason };
    }
};

export const signUp = async ({
    login,
    email,
    firstName,
    secondName,
    password,
    phone,
}: ISignUpArguments) => {
    try {
        await axios.post(
            '/auth/signup',
            {
                login,
                email,
                first_name: firstName,
                second_name: secondName,
                password,
                phone,
            },
            { withCredentials: true },
        );
        return { status: true, message: '' };
    } catch (e: any) {
        return { status: false, message: e.response.data.reason };
    }
};

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
