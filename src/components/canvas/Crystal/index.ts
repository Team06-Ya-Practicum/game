import Sprite, { ISpriteProps } from 'components/canvas/Sprite';
import { GAME_CRYSTAL_MAX_ANIMATION_LATENCY } from 'utils/constants';

export interface ICrystalProps extends ISpriteProps{
    rotationStep: number
    isShrinking: boolean
    dxOrigin: number
}

class Crystal extends Sprite<ICrystalProps> {
    private animationLatency = 0;

    override render = (ctx: CanvasRenderingContext2D, deltaTime: number): void => {
        this.rotate(deltaTime);
        this.checkMinScale();
        this.checkMaxScale();
        this.renderImage(ctx);
    }

    private rotate = (deltaTime: number): void => {
        const { isShrinking, rotationStep } = this.props;
        const rotation = rotationStep * deltaTime;
        this.props.dWidth += isShrinking ? (-rotation) : rotation;
        const offsetX = (40 - this.props.dWidth) / 2;
        this.props.dx = this.props.dxOrigin + offsetX;
    }

    private checkMinScale = (): void => {
        if (this.props.dWidth <= 10) {
            this.animationLatency += 1;
            this.props.dWidth = 10;
            if (this.animationLatency > GAME_CRYSTAL_MAX_ANIMATION_LATENCY) {
                this.props.isShrinking = false;
                this.animationLatency = 0;
            }
        }
    }

    private checkMaxScale = (): void => {
        if (this.props.dWidth >= 40) {
            this.props.isShrinking = true;
            this.props.dWidth = 40;
        }
    }
}

export default Crystal;
