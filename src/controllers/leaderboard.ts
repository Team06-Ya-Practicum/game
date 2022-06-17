import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import {
    GAME_LEADERBOARDS_SCORE_FLD,
    GAME_LEADERBOARDS_TEAM_NAME,
} from 'utils/constants';
import { ILeaderboardItem } from 'store/slices/leaderboardSlice';

export interface IAddLeaderboardRaw {
    data: ILeaderboardItem;
    ratingFieldName: string;
    teamName: string;
}

export interface ILeaderboardItemRaw {
    data: ILeaderboardItem;
}

export const fetchLeaderboard = createAsyncThunk(
    'leaderboard/get',
    async (userData, { extra: api }: { extra: any }) => {
        if (api !== undefined) {
            const response = await api.post('/leaderboard/all', {
                ratingFieldName: GAME_LEADERBOARDS_SCORE_FLD,
                limit: 1000,
                cursor: 0,
            });
            return response.data
                .filter(
                    (item: AxiosResponse) => item.data.teamName === GAME_LEADERBOARDS_TEAM_NAME,
                )
                .map((item: AxiosResponse) => item.data);
        }
        const response: AxiosResponse<ILeaderboardItemRaw[]> = await axios.post(
            '/api/leaderboard/all',
            {
                ratingFieldName: GAME_LEADERBOARDS_SCORE_FLD,
                limit: 1000,
                cursor: 0,
            },
            { withCredentials: true },
        );
        return response.data
            .filter(
                item => item.data.teamName === GAME_LEADERBOARDS_TEAM_NAME,
            )
            .map(item => item.data);
    },
);

export const fetchAddLeaderboard = async (
    item: ILeaderboardItem,
): Promise<number> => {
    const response = await axios.post(
        '/api/leaderboard',
        {
            data: item,
            ratingFieldName: GAME_LEADERBOARDS_SCORE_FLD,
            teamName: GAME_LEADERBOARDS_TEAM_NAME,
        },
        { withCredentials: true },
    );
    return response.status;
};
