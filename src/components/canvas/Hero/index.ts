import Sprite, { ISpriteProps } from 'components/canvas/Sprite';

export interface IHeroProps extends ISpriteProps {
    speed: number
    speedX: number
    speedY: number
    widthView: number
    heightView: number
}

class Hero extends Sprite<IHeroProps> {
    constructor(props: IHeroProps) {
        super(props);
        this.initListeners();
    }

    private initListeners = (): void => {
        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('keyup', this.onKeyUp);
    }

    destroy = (): void => {
        window.removeEventListener('keydown', this.onKeyDown);
        window.removeEventListener('keyup', this.onKeyUp);
    }

    onKeyDown = (event: KeyboardEvent): void => {
        this.applySpeed(event.code, true);
    }

    onKeyUp = (event: KeyboardEvent): void => {
        this.applySpeed(event.code, false);
    }

    applySpeed = (code: string, isKeyDown: boolean): void => {
        switch (code) {
            case 'ArrowRight':
                this.props.speedX = isKeyDown ? this.props.speed : 0;
                break;
            case 'ArrowLeft':
                this.props.speedX = isKeyDown ? (-this.props.speed) : 0;
                break;
            case 'ArrowUp':
                this.props.speedY = isKeyDown ? (-this.props.speed) : 0;
                break;
            case 'ArrowDown':
                this.props.speedY = isKeyDown ? this.props.speed : 0;
                break;
            default:
                // nothing to here yet
                break;
        }
    }

    override render = (ctx: CanvasRenderingContext2D, deltaTime: number): void => {
        this.updateCoordsBySpeed(deltaTime);
        this.limitCoordsByBoundaries();
        this.renderImage(ctx);
    }

    private updateCoordsBySpeed = (deltaTime: number): void => {
        this.props.dx += this.props.speedX * deltaTime;
        this.props.dy += this.props.speedY * deltaTime;
    }

    private limitCoordsByBoundaries = (): void => {
        if (this.props.dx < 0) {
            this.props.dx = 0;
        }
        if (this.props.dx + 45 > this.props.widthView) {
            this.props.dx = this.props.widthView - 45;
        }
        if (this.props.dy < 0) {
            this.props.dy = 0;
        }
        if (this.props.dy + 58 > this.props.heightView) {
            this.props.dy = this.props.heightView - 58;
        }
    }
}

export default Hero;
