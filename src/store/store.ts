import { combineReducers, configureStore } from '@reduxjs/toolkit';
import gameStateReducer from 'store/slices/gameSlice';
import userStateReducer from 'store/slices/userSlice';

export const store = configureStore({
    reducer: combineReducers({
        game: gameStateReducer,
        user: userStateReducer,
    }),
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
