import Sprite, { ISpriteProps } from 'components/canvas/Sprite';

export interface IVehicle extends ISpriteProps {
    speed: number
}

class Vehicle extends Sprite<IVehicle> {
    override render = (ctx: CanvasRenderingContext2D, deltaTime: number): void => {
        this.props.dx += this.props.speed * deltaTime;
        this.renderImage(ctx);
    }
}

export default Vehicle;
