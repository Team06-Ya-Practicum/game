export interface IProps {
    id?: string
}

abstract class DisplayObject<TProps extends IProps> {
    private propsInner: TProps;

    protected constructor(props: TProps) {
        this.propsInner = props;
    }

    get props(): TProps {
        return this.propsInner;
    }

    /**
     * implement render function when inheriting from DisplayObject class
     */
    abstract render: (ctx: CanvasRenderingContext2D, deltaTime: number) => void
}

export default DisplayObject;
