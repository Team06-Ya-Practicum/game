import DisplayObject, { IProps } from 'components/canvas/DisplayObject';

export interface ISpriteProps extends IProps {
    url: string;
}

class Sprite extends DisplayObject<ISpriteProps> {
    private readonly image: HTMLImageElement;

    constructor(ctx: CanvasRenderingContext2D, props: ISpriteProps) {
        super(ctx, props);
        this.image = document.createElement('img');
        this.image.src = props.url;
    }

    override render = (): void => {
        this.ctx.drawImage(this.image, this.props.origin.x, this.props.origin.y);
    }
}

export default Sprite;
