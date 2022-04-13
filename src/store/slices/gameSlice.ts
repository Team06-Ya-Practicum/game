import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    },
});

export const { setGameState } = gameSlice.actions;
const gameStateReducer = gameSlice.reducer;

export default gameStateReducer;
