/* eslint no-underscore-dangle: 0 */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import gameStateReducer from 'store/slices/gameSlice';
import userStateReducer from 'store/slices/userSlice';
import leaderboardReducer from 'store/slices/leaderboardSlice';

export const reducers = combineReducers({
    game: gameStateReducer,
    user: userStateReducer,
    leaderboard: leaderboardReducer,
});

declare const window: any;

export const store = typeof window === 'undefined'
    ? configureStore({
        reducer: reducers,
    })
    : configureStore({
        reducer: reducers,
        preloadedState: window.__PRELOADED_STATE__ || {},
    });

if (typeof window !== 'undefined') {
    delete window.__PRELOADED_STATE__;
}

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
