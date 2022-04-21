import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_API_URL, GAME_LEADERBOARDS_SCORE_FLD, GAME_LEADERBOARDS_TEAM_NAME } from 'utils/constants';

export interface ILeaderboardItem {
    name: string
    score: number
}

export interface IAddLeaderboardRaw {
    data: ILeaderboardItem
    ratingFieldName: string
    teamName: string
}

export const fetchLeaderboard = createAsyncThunk(
    'leaderboard/get',
    async () => {
        const response = await axios.post(`/leaderboard/${GAME_LEADERBOARDS_TEAM_NAME}`, {
            ratingFieldName: GAME_LEADERBOARDS_SCORE_FLD,
            limit: 10,
            cursor: 0,
        }, { withCredentials: true, baseURL: BASE_API_URL });
        return response.data;
    },
);

export const fetchAddLeaderboard = async (item: ILeaderboardItem): Promise<number> => {
    const response = await axios.post('/leaderboard', {
        data: { score: item.score, name: item.name },
        ratingFieldName: GAME_LEADERBOARDS_SCORE_FLD,
        teamName: GAME_LEADERBOARDS_TEAM_NAME,
    }, { withCredentials: true, baseURL: BASE_API_URL });
    return response.status;
};
