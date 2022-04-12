import DisplayObject, { IProps } from 'components/canvas/DisplayObject';

export interface ISpriteOrigin extends IProps {
    sx: number
    sy: number
    sWidth: number
    sHeight: number
}

export interface ISpriteProps extends ISpriteOrigin {
    src: string
    dx: number
    dy: number
    dWidth: number
    dHeight: number
}

class Sprite<T extends ISpriteProps> extends DisplayObject<T> {
    private readonly image: HTMLImageElement;

    constructor(props: T) {
        super(props);
        this.image = document.createElement('img');
        this.image.src = props.src;
    }

    renderImage = (ctx: CanvasRenderingContext2D): void => {
        ctx.drawImage(
            this.image,
            this.props.sx,
            this.props.sy,
            this.props.sWidth,
            this.props.sHeight,
            this.props.dx,
            this.props.dy,
            this.props.dWidth,
            this.props.dHeight,
        );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render = (ctx: CanvasRenderingContext2D, deltaTime: number): void => {
        this.renderImage(ctx);
    }
}

export default Sprite;
