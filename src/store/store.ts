import { combineReducers, configureStore } from '@reduxjs/toolkit';
import gameStateReducer from 'store/slices/gameSlice';

export const store = configureStore({
    reducer: combineReducers({
        game: gameStateReducer,
    }),
});
