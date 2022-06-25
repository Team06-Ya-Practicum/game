import { createSlice } from '@reduxjs/toolkit';
import {
    changeUserProfile,
    changeUserPassword,
    changeUserAvatar,
    getUserInfo,
    changeUserTheme,
} from 'controllers/user';
import { signOut, signIn, signUp } from 'controllers/authorization';

export enum EUserTypeError {
    GET_USER_INFO = '@user-error/get-user-info',
    CHANGE_USER_PROFILE = '@user-error/change-user-profile',
    CHANGE_USER_PASSWORD = '@user-error/change-user-password',
    CHANGE_USER_AVATAR = '@user-error/change-user-avatar',
    CHANGE_USER_THEME = '@user-error/change-user-theme',
    SIGN_OUT = '@user-error/sign-out',
    SIGN_IN = '@user-error/sign-in',
    SIGN_UP = '@user-error/sign-up',
}

export enum EUserTheme {
    LIGHT,
    DARK,
}

interface IErrorPayload {
    reason: string;
}

export interface IUserState {
    data: {
        id: number;
        firstName: string;
        secondName: string;
        login: string;
        email: string;
        phone: string;
        avatar: string;
    };
    theme: EUserTheme;
    isLoading: boolean;
    isAuthorized: boolean | null;
    error: {
        type: EUserTypeError;
        message: string;
    } | null;
}

const initialState: IUserState = {
    data: {
        id: 0,
        firstName: '',
        secondName: '',
        login: '',
        email: '',
        phone: '',
        avatar: '',
    },
    theme: EUserTheme.LIGHT,
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
                    id: action.payload.id,
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
                state.error = {
                    type: EUserTypeError.GET_USER_INFO,
                    message:
                        (action.payload as IErrorPayload)?.reason
                        || 'Unable to get user info!',
                };
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
                    id: action.payload.id,
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
                state.error = {
                    type: EUserTypeError.CHANGE_USER_PROFILE,
                    message:
                        (action.payload as IErrorPayload)?.reason
                        || 'Unable to change user profile!',
                };
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
                state.error = {
                    type: EUserTypeError.CHANGE_USER_PASSWORD,
                    message:
                        (action.payload as IErrorPayload)?.reason
                        || 'Unable to change user password!',
                };
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
                    id: 0,
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
                state.error = {
                    type: EUserTypeError.SIGN_OUT,
                    message: action.error.message || 'Unable to sign out!',
                };
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
                    id: action.payload.id,
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
                state.error = {
                    type: EUserTypeError.CHANGE_USER_AVATAR,
                    message:
                        (action.payload as IErrorPayload)?.reason
                        || 'Unable to change user avatar!',
                };
            })
            // Sign In
            .addCase(signIn.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(signIn.fulfilled, state => {
                state.isLoading = false;
                state.isAuthorized = true;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.isLoading = false;
                state.error = {
                    type: EUserTypeError.SIGN_IN,
                    message:
                        (action.payload as IErrorPayload)?.reason
                        || 'Unable to sign in!',
                };
            })
            // Sign Up
            .addCase(signUp.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(signUp.fulfilled, state => {
                state.isLoading = false;
                state.isAuthorized = true;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.isLoading = false;
                state.error = {
                    type: EUserTypeError.SIGN_UP,
                    message:
                        (action.payload as IErrorPayload)?.reason
                        || 'Unable to sign up!',
                };
            })
            // Change User Theme
            .addCase(changeUserTheme.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(changeUserTheme.fulfilled, state => {
                state.isLoading = false;
                state.theme = state.theme === EUserTheme.DARK
                    ? EUserTheme.LIGHT
                    : EUserTheme.DARK;
            })
            .addCase(changeUserTheme.rejected, (state, action) => {
                state.isLoading = false;
                state.error = {
                    type: EUserTypeError.CHANGE_USER_THEME,
                    message:
                        (action.payload as IErrorPayload)?.reason
                        || 'Unable to change the theme!',
                };
            });
    },
});

const userStateReducer = userSlice.reducer;

export default userStateReducer;
