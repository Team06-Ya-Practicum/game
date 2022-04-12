export interface IProps {
    id?: string
}

abstract class DisplayObject<T extends IProps> {
    private propsInner: T;

    protected constructor(props: T) {
        this.propsInner = props;
    }

    get props(): T {
        return this.propsInner;
    }

    /**
     * implement render function when inheriting from DisplayObject class
     */
    abstract render: (ctx: CanvasRenderingContext2D, deltaTime: number) => void
}

export default DisplayObject;
