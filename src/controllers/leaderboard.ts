import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, {AxiosResponse} from 'axios';
import { BASE_API_URL, GAME_LEADERBOARDS_SCORE_FLD, GAME_LEADERBOARDS_TEAM_NAME } from 'utils/constants';
import { ILeaderboardItem } from 'store/slices/leaderboardSlice';

export interface IAddLeaderboardRaw {
    data: ILeaderboardItem
    ratingFieldName: string
    teamName: string
}

export interface ILeaderboardItemRaw {
    data: ILeaderboardItem
}

export const fetchLeaderboard = createAsyncThunk(
    'leaderboard/get',
    async () => {
        const response: AxiosResponse<ILeaderboardItemRaw[]> = await axios.post('/leaderboard/all', {
            ratingFieldName: GAME_LEADERBOARDS_SCORE_FLD,
            limit: 1000,
            cursor: 0,
        }, { withCredentials: true, baseURL: BASE_API_URL });
        return response.data
            .filter(item => item.data.teamName === GAME_LEADERBOARDS_TEAM_NAME)
            .map(item => item.data);
    },
);

export const fetchAddLeaderboard = async (item: ILeaderboardItem): Promise<number> => {
    const response = await axios.post('/leaderboard', {
        data: item,
        ratingFieldName: GAME_LEADERBOARDS_SCORE_FLD,
        teamName: GAME_LEADERBOARDS_TEAM_NAME,
    }, { withCredentials: true, baseURL: BASE_API_URL });
    return response.status;
};
