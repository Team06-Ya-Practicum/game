import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUserInfo = createAsyncThunk('user/getUserInfo', async () => {
    const response = await axios.get('/auth/user', {
        withCredentials: true,
    });
    return response.data;
});

interface IChangeUserProfileData {
    firstName: string;
    secondName: string;
    login: string;
    email: string;
    phone: string;
}

export const changeUserProfile = createAsyncThunk(
    'user/changeUserProfile',
    async ({
        firstName,
        secondName,
        login,
        email,
        phone,
    }: IChangeUserProfileData) => {
        const response = await axios.put(
            '/user/profile',
            {
                first_name: firstName,
                second_name: secondName,
                display_name: '',
                login,
                email,
                phone,
            },
            {
                withCredentials: true,
            },
        );
        return response.data;
    },
);

interface IChangeUserPasswordData {
    oldPassword: string;
    newPassword: string;
}

export const changeUserPassword = createAsyncThunk(
    'user/changeUserPassword',
    async ({ oldPassword, newPassword }: IChangeUserPasswordData) => {
        const response = await axios.put(
            '/user/password',
            {
                oldPassword,
                newPassword,
            },
            {
                withCredentials: true,
            },
        );
        return response.data;
    },
);

export const changeUserAvatar = createAsyncThunk(
    'user/changeUserAvatar',
    async (file: FormData) => {
        const response = await axios.put('/user/profile/avatar', file, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
);
