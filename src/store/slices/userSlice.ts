import { createSlice } from '@reduxjs/toolkit';
import {
    changeUserProfile,
    changeUserPassword,
    changeUserAvatar,
    getUserInfo,
} from 'controllers/user';
import { signOut } from 'controllers/authorization';

export interface IUserState {
    data: {
        firstName: string;
        secondName: string;
        login: string;
        email: string;
        phone: string;
        avatar: string;
    };
    isLoading: boolean;
    isAuthorized: boolean | null;
    error: string | null;
}

const initialState: IUserState = {
    data: {
        firstName: '',
        secondName: '',
        login: '',
        email: '',
        phone: '',
        avatar: '',
    },
    isLoading: false,
    isAuthorized: null,
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            // Get User Info
            .addCase(getUserInfo.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.data = {
                    firstName: action.payload.first_name,
                    secondName: action.payload.second_name,
                    phone: action.payload.phone,
                    avatar: action.payload.avatar,
                    email: action.payload.email,
                    login: action.payload.login,
                };
                state.isAuthorized = true;
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Unable to get user info!';
                state.isAuthorized = false;
            })
            // Change User Profile
            .addCase(changeUserProfile.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(changeUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.data = {
                    firstName: action.payload.first_name,
                    secondName: action.payload.second_name,
                    phone: action.payload.phone,
                    avatar: action.payload.avatar,
                    login: action.payload.login,
                    email: action.payload.email,
                };
            })
            .addCase(changeUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Unable to change user profile!';
            })
            // Change User Password
            .addCase(changeUserPassword.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(changeUserPassword.fulfilled, state => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(changeUserPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Unable to change user password!';
            })
            //  Sign Out
            .addCase(signOut.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(signOut.fulfilled, state => {
                state.isLoading = false;
                state.error = null;
                state.data = {
                    firstName: '',
                    secondName: '',
                    phone: '',
                    avatar: '',
                    login: '',
                    email: '',
                };
                state.isAuthorized = false;
            })
            .addCase(signOut.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Unable to sign out!';
            })
            // Change User Avatar
            .addCase(changeUserAvatar.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(changeUserAvatar.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.data = {
                    firstName: action.payload.first_name,
                    secondName: action.payload.second_name,
                    phone: action.payload.phone,
                    avatar: action.payload.avatar,
                    login: action.payload.login,
                    email: action.payload.email,
                };
            })
            .addCase(changeUserAvatar.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Unable to change user avatar!';
            });
    },
});

const userStateReducer = userSlice.reducer;

export default userStateReducer;
