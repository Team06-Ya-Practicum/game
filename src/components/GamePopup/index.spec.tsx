import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import { ROUTES } from 'routes';
import { setGameState, EGameState } from 'store/slices/gameSlice';
import { store } from '../../store/store';
import GamePopup from './index';
import '@testing-library/jest-dom';

describe('GamePopup component tests', () => {
    const INIT_STATE_VIEW_TEXT = 'Collect crystals, avoid cars';
    const END_STATE_VIEW_TEXT = 'The game is over';

    it('should render with the initial state', () => {
        const { queryByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path='*' element={<GamePopup />} />
                    </Routes>
                </BrowserRouter>
            </Provider>,
        );
        expect(queryByText(INIT_STATE_VIEW_TEXT)).toBeInTheDocument();
        expect(queryByText(END_STATE_VIEW_TEXT)).not.toBeInTheDocument();
    });

    it('should start the game', () => {
        const { getByText, queryByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path='*' element={<GamePopup />} />
                    </Routes>
                </BrowserRouter>
            </Provider>,
        );
        const startGame = getByText('PLAY');
        fireEvent.click(startGame);

        expect(queryByText(INIT_STATE_VIEW_TEXT)).not.toBeInTheDocument();
        expect(queryByText(END_STATE_VIEW_TEXT)).not.toBeInTheDocument();
    });

    it('should navigate to leaderboards', () => {
        const LEADERBOARD_MOCK = '@mock/leaderboard';
        store.dispatch(setGameState(EGameState.ENDED));

        const { getByText, queryByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path={ROUTES.LEADERBOARD} element={<div>{LEADERBOARD_MOCK}</div>}/>
                        <Route path='*' element={<GamePopup />} />
                    </Routes>
                </BrowserRouter>
            </Provider>,
        );
        expect(queryByText(LEADERBOARD_MOCK)).not.toBeInTheDocument();

        const navToLeaderboardBtn = getByText('LEADERBOARDS');
        fireEvent.click(navToLeaderboardBtn);

        expect(queryByText(LEADERBOARD_MOCK)).toBeInTheDocument();
    });

    it('should restart the game', () => {
        store.dispatch(setGameState(EGameState.ENDED));

        const { getByText, queryByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path='*' element={<GamePopup />} />
                    </Routes>
                </BrowserRouter>
            </Provider>,
        );
        expect(queryByText(INIT_STATE_VIEW_TEXT)).not.toBeInTheDocument();

        const playAgainBtn = getByText('PLAY AGAIN');
        fireEvent.click(playAgainBtn);

        expect(queryByText(INIT_STATE_VIEW_TEXT)).toBeInTheDocument();
    });
});
