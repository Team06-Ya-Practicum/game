import DisplayObject, { IProps } from 'components/canvas/DisplayObject';
import { GAME_HERO_SPEED, GAME_LOOP_RENDER_RATE } from 'utils/constants';
import Background from 'components/canvas/Background';
import VehicleController from 'components/canvas/VehicleController';
import HeroSprite from 'assets/sprites/hero_sprite.png';
import Hero from 'components/canvas/Hero';
import CrystalController from 'components/canvas/CrystalController';

class GameEngine {
    private readonly canvasInner: HTMLCanvasElement;

    private readonly ctxInner: CanvasRenderingContext2D;

    private bgInner: DisplayObject<IProps> | undefined;

    private children: Array<DisplayObject<IProps>>;

    private animRequestId: number;

    private time: Date = new Date();

    constructor(canvasSelector: string) {
        const canvas = document.querySelector(canvasSelector) as HTMLCanvasElement;
        if (!canvas) {
            throw new Error('No canvas found, shutting down');
        }
        this.canvasInner = canvas;
        this.ctxInner = canvas.getContext('2d') as CanvasRenderingContext2D; // safe assert
        this.recalcCanvasSize();

        this.children = [
            new CrystalController({
                width: this.canvas.width,
                height: this.canvas.height,
            }),
            new VehicleController({
                width: this.canvas.width,
                height: this.canvas.height,
            }),
            new Hero({
                src: HeroSprite,
                sx: 0,
                sy: 0,
                sWidth: 45,
                sHeight: 58,
                dx: 5,
                dy: 5,
                dWidth: 45,
                dHeight: 58,
                speed: GAME_HERO_SPEED,
                speedX: 0,
                speedY: 0,
                widthView: this.canvas.width,
                heightView: this.canvas.height,
            }),
        ];
        this.gameLoop();
        this.animRequestId = window.requestAnimationFrame(this.gameLoop); // start game

        window.addEventListener('resize', this.recalcCanvasSize);
    }

    /**
     * Clean up everything here
     */
    destroy = (): void => {
        if (this.animRequestId) {
            window.cancelAnimationFrame(this.animRequestId);
        }
        this.children.forEach(child => {
            if (child instanceof Hero) {
                child.destroy();
            }
        });
        window.removeEventListener('resize', this.recalcCanvasSize);
    }

    /**
     * Game loop - runs within requestAnimationFrame
     */
    private gameLoop = () => {
        const now = new Date();
        const deltaTime: number = (Number(now) - Number(this.time)) / 1000;
        this.clearFrame();
        this.bg.render(this.ctx, deltaTime);
        this.children.forEach(child => {
            child.render(this.ctx, deltaTime);
        });
        setTimeout(() => {
            this.time = now;
            this.animRequestId = window.requestAnimationFrame(this.gameLoop);
        }, GAME_LOOP_RENDER_RATE);
    }

    /**
     * recalculate canvas size for correct aspect ratio
     */
    recalcCanvasSize = (): void => {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.initBackground();
    }

    /**
     * init background image by adding it
     * to the children array as first element
     */
    private initBackground = () => {
        this.bgInner = new Background({
            width: this.canvas.width,
            height: this.canvas.height,
        });
    }

    /**
     * use to clear canvas at the start of frame rendering
     */
    private clearFrame = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    get canvas(): HTMLCanvasElement {
        return this.canvasInner;
    }

    get ctx(): CanvasRenderingContext2D {
        return this.ctxInner;
    }

    get bg(): DisplayObject<IProps> {
        return this.bgInner as DisplayObject<IProps>;
    }
}

export default GameEngine;
