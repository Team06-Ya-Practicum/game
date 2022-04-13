export type TCallback = (...args: unknown[]) => void;
export type TListeners = Record<string, TCallback[]>;

class EventBus {
    private readonly listeners;

    constructor() {
        this.listeners = {} as TListeners;
    }

    on(event: string, callback: TCallback): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [] as TCallback[];
        }
        const arr = this.listeners[event] as TCallback[];
        arr.push(callback);
    }

    off(event: string, callback: TCallback): void {
        if (!this.listeners[event]) {
            return;
        }
        const arr = this.listeners[event] as TCallback[];
        this.listeners[event] = arr.filter(
            listener => listener !== callback,
        );
    }

    clear(event: string): void {
        this.listeners[event] = [];
    }

    clearAll(): void {
        Object.keys(this.listeners).forEach(this.clear.bind(this));
    }

    emit(event: string, ...args: unknown[]): void {
        if (!this.listeners[event]) {
            return;
        }
        const arr = this.listeners[event] as TCallback[];
        arr.forEach(listener => {
            listener(...args);
        });
    }
}

export default EventBus;
