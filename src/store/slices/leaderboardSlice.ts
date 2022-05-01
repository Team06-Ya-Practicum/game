import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchLeaderboard } from 'controllers/leaderboard';
import { RootStateType } from 'store/store';

export interface ILeaderboardItem {
    name: string
    scoreTeam06Ya: number
    teamName: string
}

export interface ILeaderboardState {
    items: ILeaderboardItem[]
}

const initialState: ILeaderboardState = {
    items: [],
};

const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState,
    reducers: {
        setLeaderboard(state, action: PayloadAction<ILeaderboardItem[]>) {
            state.items = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchLeaderboard.fulfilled, (state, action) => {
            state.items = action.payload;
        });
    },
});

export const selectLeaderboardItems = (state: RootStateType) => state.leaderboard.items;

export const { setLeaderboard } = leaderboardSlice.actions;

export default leaderboardSlice.reducer;
