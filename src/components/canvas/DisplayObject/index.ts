import EventBus from 'utils/eventBus';

export interface IPoint {
    x: number
    y: number
}

export interface IProps {
    origin: IPoint
}

class DisplayObject<T extends IProps> extends EventBus {
    private readonly propsInner: T;

    private readonly ctxInner: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D, props: T) {
        super();
        this.ctxInner = ctx;
        this.propsInner = props;
    }

    get props(): T {
        return this.propsInner;
    }

    get ctx(): CanvasRenderingContext2D {
        return this.ctxInner;
    }

    /**
     * implement render function when inheriting from DisplayObject class
     */
    render = (): void => {
        console.error('EMPTY RENDER LOGIC');
    }
}

export default DisplayObject;
