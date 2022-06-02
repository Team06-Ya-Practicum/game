import { combineReducers, configureStore } from '@reduxjs/toolkit';
import gameStateReducer from 'store/slices/gameSlice';
import userStateReducer from 'store/slices/userSlice';
import leaderboardReducer from 'store/slices/leaderboardSlice';

export const reducers = combineReducers({
    game: gameStateReducer,
    user: userStateReducer,
    leaderboard: leaderboardReducer,
});

export const store = configureStore({
    reducer: reducers,
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
