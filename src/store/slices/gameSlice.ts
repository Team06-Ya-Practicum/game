import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateType } from 'store/store';

export enum EGameState {
    INIT = '@game-state/init',
    PLAYING = '@game-state/playing',
    ENDED = '@game-state/ended'
}

export interface IGameState {
    gameState: EGameState
    score: number
}

const initialState: IGameState = {
    gameState: EGameState.INIT,
    score: 0,
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setGameState: (state: IGameState, action: PayloadAction<EGameState>): void => {
            state.gameState = action.payload;
        },
        setGameScore: (state: IGameState, action: PayloadAction<number>): void => {
            state.score = action.payload;
        },
        incrementScore: (state: IGameState, action: PayloadAction<number>): void => {
            state.score += action.payload;
        },
        resetGameState: (state: IGameState): void => {
            state.gameState = initialState.gameState;
            state.score = initialState.score;
        },
    },
});

export const selectScore = (state: RootStateType) => state.game.score;

export const selectState = (state: RootStateType): EGameState => state.game.gameState;

export const {
    setGameState,
    setGameScore,
    incrementScore,
    resetGameState,
} = gameSlice.actions;
const gameStateReducer = gameSlice.reducer;

export default gameStateReducer;
