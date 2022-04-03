import Store, { IStoreState } from 'store/store';

export enum EGameState {
    INIT = '@game-state/init',
    PLAYING = '@game-state/playing',
    ENDED = '@game-state/ended'
}

export interface IGameState extends IStoreState {
    current: EGameState
}

class GameState extends Store<IGameState> {
    isPlaying(): boolean {
        return this.state.current === EGameState.PLAYING;
    }
}

const gameState = new GameState({
    current: EGameState.INIT,
});

export default gameState;
