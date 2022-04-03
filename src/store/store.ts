import EventBus from 'utils/eventBus';

export enum EStoreEvents {
    Updated = 'updated',
}

export interface IStoreState {
    [key: string]: any
}

class Store<T extends IStoreState> extends EventBus {
    protected state: T;

    protected readonly initialState: IStoreState;

    constructor(initialState: T = {} as T) {
        super();
        this.initialState = initialState;
        this.state = { ...initialState };
    }

    getState(): T {
        return this.state;
    }

    setState(state: T): void {
        Object.assign(this.state, state);
        this.emit(EStoreEvents.Updated, this.state);
    }

    public reset(): void {
        this.state = { ...this.initialState as T };
    }
}

export default Store;
